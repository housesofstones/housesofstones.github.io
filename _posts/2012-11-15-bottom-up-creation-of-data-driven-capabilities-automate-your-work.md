---
title: 'Bottom-up creation of data-driven capabilities: automate your work'
author: swheeler
layout: post
permalink: /2012/11/15/bottom-up-creation-of-data-driven-capabilities-automate-your-work/
jabber_published:
  - 1353008004
email_notification:
  - 1353008006
publicize_twitter_user:
  - SchaunW
publicize_reach:
  - 'a:3:{s:7:"twitter";a:1:{i:1566504;i:12;}s:2:"fb";a:1:{i:664462;i:207;}s:2:"wp";a:1:{i:0;i:43;}}'
categories:
  - Organizations
tags:
  - automation
  - data management
  - data-driven
  - R
---
My [previous post][1] on how to transform an organization into a more data-driven version of itself made a pretty big assumption that often doesn’t hold true. I assumed that people in the organization wanted their company or agency to become more data-driven. I think almost everyone says they want that if asked. I even think most people think they want that. But I don’t think most managers and executives actually want it. This is the first of what will probably be two or three posts on what to do when you want a more data-driven organization but the rest of your organization doesn’t.<!--more-->

Here’s a scenario:

A manager asks for an analysis of a particular issue relevant to an upcoming decision. The analysts pull the appropriate data and put together a simple but thorough analysis of the topic. The issue isn’t incredibly complicated, and the data show a couple courses of action are clearly more desirable than others. After receiving the analysis, the manager hands the analysis back and says, “Thanks, but we’re going to go with our original plans.” Or, even better: after receiving the analysis, the manager hands the analysis back and says, “Something screwy must be going on with these findings over here. It just doesn’t make sense that those options would look as good as this analysis shows. Go take those cases out and then give me back the revised analysis.”

Decision makers can say they want to know “what the data says” but feel perfectly comfortable ignoring that data if it doesn’t say what they thought it should say, or they can actually trust their guts so unquestioningly that if the data contradicts them they demand that the (apparently faulty) data be changed. These are both cases of decision makers failing to identify and communicate what they really want. They say they want data and analysis. What they really want is a narrative.

People who try to provide data-driven analyses tend to view data as a map – it lays out where the different options are and gives information about what the consequences might be of choosing one option over another. People who request data-driven analysis, however, often view data as fuel – they’ve already decided where they want to go, but they need something to give them enough momentum to convince other people in the organization to go there. In my more cynical moments, I’d call that propaganda, but I think in reality people just give a lot more credence to their intuition than they should. They don’t see themselves as ignoring or misusing the data. They just really think they see things pretty clearly and aren’t going to let some spreadsheets and graphs cloud the issue.

Most of the suggestions I gave in the [last post][1] about creating data-driven organizations probably won’t work that well if the organization is filled with a bunch of people who say they want data but really want narratives. In this post, I want to focus on one way of dealing with that problem: automating repetitive tasks.

Maybe it seems weird to prioritize automation. Most people start by talking about “[culture change][3]” or stuff like that. I’ll get around to talking about those sorts of things, but it seems to me that if the value of rigorous data analysis was really crystal clear to everyone in an organization, then you wouldn’t have people ignoring or disputing the data. People disguise non-data-driven decisions as data driven when the data is less than clear. The only way to make the data more clear is to dig into it, sometimes actually opening up files in a spreadsheet and going through line by line to see what anomalies there are. That takes a lot of time – time analysts don’t have if they’re spending all of their work hours helping executives weave narratives.

Let me give an example from my current job. I work most closely with our company’s marketing department, so a lot of the requests that come my way involve pulling lists of past and potential customer data from our records, filtered by different criteria that define the focus of a particular marketing campaign. When I first arrived here, those records were queries from our SQL server using the same third-party [CRM][4] tool that our sales force and other employees used to enter information about their interactions with customers. I had to go into the tool and, through a series of drop down menus, select which fields I wanted to query and what filters I wanted to apply to those fields. I had to run several queries because some information is connected to companies and some information is connected to individuals who work at those companies. I then had to merge those files in a separate program – most people used the VLOOKUP function in Excel. A moderately complicated request took at least a few hours to pull, and more complicated requests could take more than a day. The whole thing worked reasonably well in that we got the information we needed. It just ate up a lot of my time.

Shortly after arriving in my position here, I lobbied to get direct access to our SQL server. Once I got that access I was able to query the records directly, which made my queries run a lot faster, but the main benefit was that I could write scripts for queries that were likely to be repeated, which now allows me to run queries from start to finish without me needing to pay attention to them. Huge time saver.

The rest of this post lays out a simplified version of the code I use in R to automate this part of my data management. The code could definitely be more efficient (in fact, preparing it for this post shamed me into fixing some of the really ugly parts), but efficiency isn’t my main concern here. That’s always nice, but the real gains come from creating a process that can run without me needing to oversee it.

R has several packages for facilitating SQL queries. I go with the [RODBC][5] package, but I’ve heard good things about the [RMySQL][6] package. First, you set up a connection between your terminal and the SQL server:

[sourcecode language="r"]  
library(RODBC)

db_connect <- odbcDriverConnect(paste(  
&#8216;driver = {SQL Server}&#8217;,  
&#8216;server = your_server&#8217;,  
&#8216;database = your_database&#8217;,  
&#8216;User ID = your_userid&#8217;,  
&#8216;Password = your_password&#8217;,  
&#8216;trusted_connection = true&#8217;, sep = ";"),  
readOnlyOptimize = TRUE,  
rows\_at\_time = 1,  
believeNRows = FALSE)  
[/sourcecode]

Once that’s done, you can just use the SqlQuery() function (see [here][7] if you don’t know anything about SQL). SQL databases aren’t set up like a spreadsheet – different tables contains different pieces of information and a query brings all those pieces together. Technically, I could just write out the entire query for every piece of data I needed for a particular records request. That would certainly be the most efficient way to go in terms of time spent pulling the records, but it’s not necessarily the most efficient way to build the request itself. I would need to go in and write new parts of the query each time a different request came in. The beauty of R is that you can modularize things like an SQL query: split it into pieces that can ingest the particulars of your current request and expand the code to meet those criteria.

This requires a few custom functions. A lot of our basic company information is stored in one big table that looks a lot like a traditional spreadsheet – each company is a row and each column is a field such as address, city, state, etc. But more specific information about sales histories and things like that are stored in separate tables that have the values for particular columns linked to a unique identifier that ties those values back to the appropriate companies. That makes sense: a huge number of companies in our records are companies with which we want to develop a relationship, but with whom we currently don’t have interaction. If we create values for all of the companies, most of those values would be null, meaning they’d just be taking up space. By storing custom values in separate tables, we only make room for the information we have, not the information we don’t have.

So to pull in all the data for a particular request requires two custom functions. The first one pulls all the basic company data I need for a typical request:

[sourcecode language="r"]  
\# Function to get basic company data

GetCompany <- function(&#8230;){

\# Section 1  
fields <- sqlQuery(db_connect,  
"SELECT Description,  
Type_Id,  
Code_Id  
FROM DB\_Fields\_Tbl  
WHERE Table_Id = 1  
AND Style_Id <> 1024",  
as.is = TRUE)

gn.value <- fields[fields$Description == "Group Number",]$Type_Id  
ct.value <- fields[fields$Description == "Company Type",]$Type_Id  
la.value <- fields[fields$Description == "Latitude",]$Type_Id  
lo.value <- fields[fields$Description == "Longitude",]$Type_Id

\# Section 2  
companies <- sqlQuery(max_connect, paste(  
"SELECT s.Key_Index,  
s.Name AS Company_Name,  
gn.NumericCol AS Group_Number,  
s.Address\_Line\_1,  
s.City,  
s.State_Province,  
s.Zip_Code,  
s.Country,  
la.NumericCol AS Latitude,  
lo.NumericCol AS Longitude,  
ctb.Description AS Company_Type,  
FROM DB\_Clients\_Tbl AS s  
LEFT JOIN DB\_Fields\_Tbl AS gn  
ON s.Key\_Index=gn.Key\_Index  
AND gn.Type_Id=", gn.value,"  
LEFT JOIN DB\_Fields\_Tbl AS sta  
ON s.Key\_Index=sta.Key\_Index  
AND sta.Type_Id=", st.value,"  
LEFT JOIN DB\_Fields\_Tbl AS la  
ON s.Key\_Index=la.Key\_Index  
AND la.Type_Id=", la.value,"  
LEFT JOIN DB\_Fields\_Tbl AS lo  
ON s.Key\_Index=lo.Key\_Index  
AND lo.Type_Id=", lo.value,"  
LEFT JOIN DB\_Field\_Defs_Tbl AS stb  
ON sta.Type\_Id=stb.Type\_Id  
AND sta.Code\_Id=stb.Code\_Id  
AND stb.Table_Id=2  
WHERE s.Record_Type=1"),  
as.is = TRUE)

\# Section 3  
companies <- CleanLocations(companies)  
companies$Group\_Number <- as.numeric(companies$Group\_Number)  
companies$Latitude <- as.numeric(companies$Latitude)  
companies$Longitude <- as.numeric(companies$Longitude)

companies  
}  
[/sourcecode]

Section 1 of the code pulls index values for particular custom fields. I leave most of the custom field pulling to the step I’ll discuss next, but there are a few custom values that I use for the grand majority of my queries, so I’ve just built them into the basic pull. The DB\_Fields\_Tbl table contains, among other things, a list of the names of the various custom fields along with corresponding codes (“Type\_Id”) for those names. I just pull those records into a small data set in R and use that to identify the codes I will need for a query. In this case, I’ve pulled the indices for Group\_Number, which is an identifier we use to link our sales data to data from other parts of the company, as well as Company_Type, a broad classification that our department uses to differentiate companies that cater to different types of customers, and also latitude and longitude.

Section 2 is the actual SQL query. The first part of the SELECT statement pulls in the address, zip code, and other basic data, as well as the Key\_Index, which is the unique identifier for each company that we’ll use to pull in other custom fields. The rest of the statement pulls in theGroup\_Number, Company_Type, latitude, and longitude values.

Section 3 cleans up the data. The first call is to a CleanLocatons() function that I wrote to address some idiosyncrasies of our data. (If you let your sales people enter in data on customers, never give them the ability to choose their own country abbreviations if you do business in both Canada and China. Seriously. Don’t let them do it. Ever.) I then classify the Group_Number, latitude, and longitude values to numeric.

So that gives me my basic template – a data set with companies as rows and all of my most commonly used fields as columns. Now I pull some of the custom columns.

[sourcecode language="r"]  
\# Function to add on columns as needed  
GetColumns <- function(x, &#8230;){

#Section 1  
loc <- rep("t", length(x))  
loc[loc %in% c("Low Target", "High Target", "Competition")] <<- "an"  
loc[loc %in% c("Customers", "Primary Contact")] <- "n"

fields <- sqlQuery(db_connect,  
"SELECT Description,  
Type_Id,  
Code_Id  
FROM DB\_Fields\_Tbl  
WHERE Table_Id = 1  
AND Style_Id <> 1024",  
as.is = TRUE)

#Section 2  
newlist <- lapply(1:length(x), function(i){  
if(loc[i] != "t" & loc[i] != "an" & loc[i] != "n"){  
stop("Enter a valid data type")  
}

index <- fields$Type_Id\[(fields$Description %in% x[i])\]\[1\]

if(loc[i] == "t"){  
entries <- sqlQuery(max_connect,  paste(  
"SELECT a.Key_Index,  
b.Description AS Output  
FROM DB\_Fields\_Tbl AS a  
INNER JOIN DB\_Field\_Defs_Tbl AS b  
ON a.Type\_Id=b.Type\_Id  
AND a.Code\_Id=b.Code\_Id  
AND b.Table_Id=2  
WHERE a.Type_ID = ", index),  
as.is = TRUE)  
}

if(loc[i] == "an"){  
entries <- sqlQuery(max_connect,  paste(  
"SELECT Key_Index,  
AlphaNumericCol AS Output  
FROM DB\_Fields\_Tbl  
WHERE Type_ID = ", index),  
as.is = TRUE)  
}

if(loc[i] == "n"){  
entries <- sqlQuery(max_connect,  paste(  
"SELECT Key_Index,  
NumericCol AS Output  
FROM DB\_Fields\_Tbl  
WHERE Type_ID = ", index),  
as.is = TRUE)  
}

entries  
})

#Section 3  
newcols <- Reduce(function(&#8230;) merge(&#8230;,  by = "Key_Index",  
all.x = TRUE,  all.y = TRUE,  
sort = FALSE),  newlist)

colnames(newcols) <- c("Key_Index",  
gsub("\s+",  "_",  
gsub("[^[:alnum:]\s]+", "",  x)))

out <- merge(companies, newcols, by=c("Key_Index"), all.x = TRUE, all.y = FALSE)  
out[is.na(out) | out == "NA"] <- ""

out  
}  
[/sourcecode]

Section 1 compares the field names I’ve entered to a couple lists that tell me whether to look for values in a table (meaning the values are codes that are themselves references to lengthier values in another table), or if the information is stored in a column of numeric or alphanumeric values. When our sales people enter information by choosing an option from a drop down menu, that gets stored as a table. When they just type in the information, it gets stored as a numeric or alphanumeric. This section also loads up the fields list again.

Section 2 goes in order through each custom field I’ve requested and pulls the Key_Index (unique identifier) and relevant values for that field from the appropriate location (table, numeric, or alphanumeric). It stores each pull as an element in a list.

Section 3 reduces the list by merging each element with the previous one using the Key_Index. It then renames all of the values according to what I called them originally and merges the final product with the basic company data I already pulled.

All that took me about a day to set up. But now that it’s set up, what can I do with it?

[sourcecode language="r"]

\# Get the basic company data  
companies <- GetCompanies()

\# Identify custom field needs  
needs <- c("Market Segment", "Product A Sales Step", "Product B Sales Step")

\# Get custom fields  
companies.df <- GetColumns(needs)

\# Filter information by criteria specified by customer  
companies.df <- schools.df[  
(grepl("1|2|3", companies.df$Product\_A\_Sales_Step) |  
grepl("1|2|3|4|5|6|7|8", companies.df$Product\_B\_Sales_Step)) &  
grepl("Primary|Secondary",companies.df$Market_Segment), ]

\# Identify columns of information requested by customer  
finalkeep <- c("Key\_Index", "Group\_Number", "Company\_Name", "Address\_Line_1",  
"City", "State\_Province", "Zip\_Code", "Company_Type",)

\# Cut file to only include requested columns  
final.df <- companies.df[, finalkeep]

\# Write data to file  
write.csv(final.df,  
paste("C:/Mailing Lists/1T\_AB\_PS_",Sys.Date(),".csv",sep=""),  
row.names = FALSE)  
[/sourcecode]

An internal customer comes to me and says he needs to do a direct mail campaign to companies who are in our Primary or Secondary market segments and who are either in sales step 1 through 3 for Product A or sales step 1 through 8 for Product B. In addition to the mailing information he would also like to be able to compare the list to a third party source, so I include the Group_Number identifier to facilitate that, and he’d also like to know the composition of the list in terms of Company Type, so I include that too. I write the data to a file named in a way that I will recognize (1T means this was a request for our 1T division, AB refers to the relevant products and PS refers to the segments targeted) and I append the date that I pulled the list. I save the above script by the same name, minus the date.

This list that probably would have taken a few hours to cobble together using the original methods I inherited when I came into my position. It now takes around 10 minutes from start to finish, and most of that time is taken up running that CleanLocations() function. All I have to do is highlight the code in RStudio, press control-enter, and then check back in my Mailing Lists folder periodically to see if the deliverable has shown up yet. And when this person emails me back in five months and with this list as an attachment and says “You remember this list you pulled a while ago? We want to do this again. Can you pull an updated list?” I just look at the filename, go into my files and open the script, and press control-Enter. Done.

As I said earlier, this code isn’t incredibly efficient. There are a lot of things I could tweak to make the lists pull faster. The thing is, I don’t need them to pull faster. A few weeks ago we found out around 9:00 in the morning that we needed to do an email campaign to every individual contact (not just companies) in our data base, and that the email needed to be sent before the close of business. It was the largest query of our records I’ve had to do – and was literally the largest query I could possibly do. The whole thing was pulled within about two hours. I don’t need it to run any faster. I just need it to run without me having to pay attention to it. That leaves me with time to pay attention to other issues, and that time is what allows me to come up with better ways to use our data and to construct analyses instead of narratives.

 [1]: http://housesofstones.github.io/2012/11/13/big-data-of-all-sizes-how-to-turn-a-regular-organization-into-a-data-driven-organization/
 [2]: http://housesofstones.github.io/2012/11/13/big-data-of-all-sizes-how-to-turn-a-regular-organization-into-a-data-driven-organization/#comment-316
 [3]: http://www.amazon.com/Change-Culture-Game-Breakthrough-Accountability/dp/1591845394
 [4]: http://en.wikipedia.org/wiki/Customer_relationship_management
 [5]: http://cran.r-project.org/web/packages/RODBC/index.html
 [6]: http://cran.r-project.org/web/packages/RMySQL/index.html
 [7]: http://www.w3schools.com/sql/default.asp
