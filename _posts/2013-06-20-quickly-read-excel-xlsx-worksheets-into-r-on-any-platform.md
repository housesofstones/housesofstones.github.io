---
title: Quickly read Excel (xlsx) worksheets into R on any platform
author: Schaun Wheeler
layout: post
permalink: /2013/06/20/quickly-read-excel-xlsx-worksheets-into-r-on-any-platform/
categories:
  - Data Collection
  - Uncategorized
tags:
  - Excel
  - R
---
I [wrote ][1]a couple days about about importing Excel files into R. There are lots of ways to do this, but all the ways that use only R have drawbacks (as I outlined in my last post), and all the [other way][2]s require installation of programs other than R. I&#8217;m not opposed to using programs other than R &#8211; it&#8217;s easy enough to weave, for example,[ Python and R code][3] into each other. But I&#8217;d become curious about the possibility of solving this problem without the need for added programs, so I did some more searching. Turns out you can import an .xlsx document into pretty much anything that can parse XML, because that&#8217;s all an .xlsx document is.<!--more-->

The following gist uses R&#8217;s XML package, as well as a little help from the \`plyr\` package. It will import all sheets from an .xlsx document into a list of data frames and doesn&#8217;t require any additional installations of converters, and as far as I can tell, it should work on any platform. They key is to rename the document to have a .zip extension. Then you can unzip the document, pull out the XML files, and match them up to recreate a view similar to what you would see in Excel. The issue of how to deal with XML files in R is an issue that [comes up regularly][4] on Stack Overflow, so I thought this gist could also be a nice little example of how to handle that sort of problem (long story short: convert the XML to a list and manipulate the list &#8211; it&#8217;s generally much easier than trying to manipulate the XML directly).

*EDIT 1: You may notice that this converts all times and date-times into dates. That&#8217;s because the particular data I was working with didn&#8217;t have times or date-times, and because I&#8217;m still trying to figure out exactly how Excel handles date/time origins. I&#8217;ll edit the function when I find out more.*

*EDIT 2: Ok, times and date-times are now appropriate, but only if you&#8217;re opening an xlsx document that was created on Windows. The Mac version of Excel [apparently][5] uses a different origin for dates, which is stupid. I&#8217;m trying to figure out how to tell from the XML which platform an xlsx document was created on, but so far I haven&#8217;t had any luck.*

*EDIT 3: I&#8217;ve now updated the function. Interestingly, it seems Microsoft might have standardized its handling of dates across operating systems. I created an .xlsx file on my Mac and only the Windows origin (&#8220;1899-12-30&#8243;) resulted in the correct dates. I&#8217;ve left a note in the code to indicate the origin that is supposed to be the right origin for Mac Excel (&#8220;1904-01-01&#8243;). I&#8217;ve also included some options in the function to select only specific sheets from a workbook, and to indicate whether the function should expect the sheets to have headers.*

*EDIT4: In response to James Dalrymple&#8217;s comments below, I&#8217;ve revised the function. For someone more comfortable with R&#8217;s list structure than with xpath expressions, the original method of converting the XML to a list was convenient. However, extracting node values and attributes through xpath expressions gives a very noticeable boost in speed. I ran the following, revised function on an 18.3 MB file with 18 sheets in it. It took 14 minutes to run. And I&#8217;m now much more familiar with xpath than I was before, so I see this as an all-around win.*

{% higlight r linenos%}
library(XML)
library(plyr)
library(pbapply)
 
xlsxToR <- function(file, keep_sheets = NULL, header = FALSE) {
  
  temp_dir <- file.path(tempdir(), "xlsxToRtemp")
  suppressWarnings(dir.create(temp_dir))
  
  file.copy(file, temp_dir)
  new_file <- list.files(temp_dir, full.name = TRUE, pattern = basename(file))
  unzip(new_file, exdir = temp_dir)
  
  # Get OS
  # These lines are included because R documentation states that Excel handles 
  # date origins differently on Mac than on Windows. However, manual inspection
  # of Excel files created on Windows and Mac indicated that in fact the origin
  # is handled the same across both platforms. I've kept the original code here
  # commented out in case it can be of use in the future.
  # mac <- xmlToList(xmlParse(list.files(
  #   paste0(temp_dir, "/docProps"), full.name = TRUE, pattern = "app.xml")))
  # mac <- grepl("Macintosh", mac$Application)
  # if(mac) {
  #   os_origin <- "1899-12-30" # documentation says should be "1904-01-01"
  # } else {
  #   os_origin <- "1899-12-30"
  # }
  
  # Get names of sheets
  sheet_names <- xmlToList(xmlParse(list.files(
    paste0(temp_dir, "/xl"), full.name = TRUE, pattern = "workbook.xml")))
  sheet_names <- rbind.fill(lapply(sheet_names$sheets, function(x) {
    as.data.frame(as.list(x), stringsAsFactors = FALSE)
  }))
  rownames(sheet_names) <- NULL
  sheet_names <- as.data.frame(sheet_names,stringsAsFactors = FALSE)
  sheet_names$id <- gsub("\\D", "", sheet_names$id)
  
  # Get column classes
  styles <- xmlParse(list.files(
    paste0(temp_dir, "/xl"), full.name = TRUE, pattern = "styles.xml"))
  styles <- xpathApply(styles, "//x:xf[@applyNumberFormat and @numFmtId]", 
    namespaces = "x", xmlAttrs)
  styles <- lapply(styles, function(x) {
    x[grepl("applyNumberFormat|numFmtId", names(x))]})
  styles <- do.call("rbind", (lapply(styles, 
    function(x) as.data.frame(as.list(x[c("applyNumberFormat", "numFmtId")]),
      stringsAsFactors = FALSE))))
  
  if(!is.null(keep_sheets)) {
    sheet_names <- sheet_names[sheet_names$name %in% keep_sheets,]
    
  }
  
  worksheet_paths <- list.files(
    paste0(temp_dir, "/xl/worksheets"), 
    full.name = TRUE, 
    pattern = paste0(
      "sheet(", 
      paste(sheet_names$id, collapse = "|"), 
      ")\\.xml$"))
  
  worksheets <- lapply(worksheet_paths, function(x) xmlRoot(xmlParse(x))[["sheetData"]])
  
  worksheets <- pblapply(seq_along(worksheets), function(i) {
    
    x <- xpathApply(worksheets[[i]], "//x:c", namespaces = "x", function(node) {
      c("v" = xmlValue(node[["v"]]), xmlAttrs(node))
    })
    
    if(length(x) > 0) {
      
      x_rows <- unlist(lapply(seq_along(x), function(i) rep(i, length(x[[i]]))))
      x <- unlist(x)
      
      x <- reshape(
        data.frame(
          "row" = x_rows,
          "ind" = names(x),
          "value" = x,
          stringsAsFactors = FALSE), 
        idvar = "row", timevar = "ind", direction = "wide")
      
      x$sheet <- sheet_names[sheet_names$id == i, "name"] 
      colnames(x) <- gsub("^value\\.", "", colnames(x))
    }
    x
  })
  worksheets <- do.call("rbind.fill", 
    worksheets[sapply(worksheets, class) == "data.frame"])
  
  entries <- xmlParse(list.files(paste0(temp_dir, "/xl"), full.name = TRUE, 
    pattern = "sharedStrings.xml$"))
  entries <- xpathSApply(entries, "//x:si", namespaces = "x", xmlValue)
  names(entries) <- seq_along(entries) - 1
  
  entries_match <- entries[
    match(worksheets$v[worksheets$t == "s" & !is.na(worksheets$t)], 
      names(entries))]
  worksheets$v[worksheets$t == "s" & !is.na(worksheets$t)] <- entries_match
  worksheets$cols <- match(gsub("\\d", "", worksheets$r), LETTERS)
  worksheets$rows <- as.numeric(gsub("\\D", "", worksheets$r))
    
  if(!any(grepl("^s$", colnames(worksheets)))) {
    worksheets$s <- NA
  }
  
  workbook <- lapply(unique(worksheets$sheet), function(x) {
    y <- worksheets[worksheets$sheet == x,]
    y_style <- as.data.frame(tapply(y$s, list(y$rows, y$cols), identity), 
      stringsAsFactors = FALSE)
    y <- as.data.frame(tapply(y$v, list(y$rows, y$cols), identity), 
      stringsAsFactors = FALSE)
    
    if(header) {
      colnames(y) <- y[1,]
      y <- y[-1,]
      y_style <- y_style[-1,]
    }
    
    y_style <- sapply(y_style, function(x) {
      out <- names(which.max(table(x)))
      out[is.null(out)] <- NA
      out
    })
    
    if(length(styles) > 0) {
      y_style <- styles$numFmtId[match(y_style, styles$applyNumberFormat)]
    }
    
    y_style[y_style %in% 14:17] <- "date"
    y_style[y_style %in% c(18:21, 45:47)] <- "time"
    y_style[y_style %in% 22] <- "datetime"
    y_style[is.na(y_style) & !sapply(y, function(x)any(grepl("\\D", x)))] <- "numeric"
    y_style[is.na(y_style)] <- "character"
    y_style[!(y_style %in% c("date", "time", "datetime", "numeric"))] <- "character"
    
    y[] <- lapply(seq_along(y), function(i) {
      switch(y_style[i],
        character = y[,i],
        numeric = as.numeric(y[,i]),
        date = as.Date(as.numeric(y[,i]), origin = os_origin),
        time = strftime(as.POSIXct(as.numeric(y[,i]), origin = os_origin), format = "%H:%M:%S"),
        datetime = as.POSIXct(as.numeric(y[,i]), origin = os_origin))
    }) 
    y 
  })
  
  if(length(workbook) == 1) {
    workbook <- workbook[[1]]
  } else { 
    names(workbook) <- sheet_names$name
  }
  
  workbook
}
{%endhighlight%}

 [1]: http://housesofstones.github.io/2013/06/18/quickly-read-excel-worksheets-into-r-windows-only-sorry/
 [2]: https://github.com/dilshod/xlsx2csv
 [3]: http://rpy.sourceforge.net/rpy2.html
 [4]: http://stackoverflow.com/search?q=%5Br%5D%2C+%5Bxml%5D
 [5]: https://stat.ethz.ch/pipermail/r-help/2011-March/270455.html
