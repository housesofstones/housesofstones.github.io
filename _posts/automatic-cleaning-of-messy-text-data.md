---
title: Automatic cleaning of messy text data
author: Schaun Wheeler
layout: post
permalink: /2012/09/13/automatic-cleaning-of-messy-text-data/
jabber_published:
  - 1347543182
email_notification:
  - 1347543185
categories:
  - Analysis
  - Data Collection
tags:
  - cleaning
  - mining
  - R
  - spell check
  - text
---
*[UPDATE: I just wrapped AspellCheck() in a llply/laply wrapper from Hadley Wickham's \`plyr\` package, so now it can be run on a vector of texts as well as a single character string, and it now has a default progress bar (set progress = "none" to turn it off). But you have to have plyr loaded to use the AspellCheck() function now.]*

*[UPDATED UPDATE: Since writing this post, I revised many of the functions and repackaged them in my repo. I got rid of using the plyr package because I was able to speed up the spell checker by vectorizing the call to \`aspell\`. You can now install these tools by first installing the devtools package, and then calling \`install_github("tmt", "schaunwheeler") in the R console.]*

I deal with a lot of text data, and in R, the basic, general-purpose suite of tools for analyzing text data is the \`tm\` (text mining) package. I like the tm package a lot – it provides some convenient methods for pulling data from lots of different formats into a single corpus of texts, and it uses the sparseMatrix() function from the \`Matrix\`  package to allow comparisons of very large numbers of terms across very large numbers of documents without eating up very large amounts of resources. <!--more-->

However, I’ve been running into situations lately where I need a little something extra. I’ve been analyzing a lot of open-response comments from customer surveys, and it seems people don’t worry too much about their spelling when answering those sorts of things. Also, Paul and I have been working on a meta-analysis of research on the Bosnian conflict, which has involved converting a lot of articles from PDF format to text, which introduces a bunch of spelling mistakes as part of the conversion process. The \`tm\` tools assume that the texts to be analyzed are already in pretty good shape. I need some tools that don’t make that assumption.

So over the past couple months I’ve built a few functions to get me what I need. I’ve included the full code for those functions [here][1]. In the R environment, the whole thing can be loaded up with:

[sourcecode language="r"]  
source(&#8220;https://raw.github.com/schaunwheeler/tmt/master/R/tmt.R&#8221;)  
[/sourcecode]

A lot of what’s there is just a collection of convenience functions that I haven’t fully tested yet, so I won’t spend much time writing about those. The functions I want to focus on here are AspellCheck() and SplitWords(), which I’m now using to do automatic spelling correction. In a subsequent post, I’ll write about the GetSentiment() function which I’m using to mine text data using regular expressions instead of simple word matching.

The base distribution of R comes with an aspell() function that can access three different spell-check programs: Ispell, Aspell, and Hunspell. I don’t know much about the differences between the programs. I chose to go with Aspell because it was the first of the three that I could figure out how to install without having a C++ compiler. (I’ve included instructions in the readme file at the above link for setting up Aspell on a Windows of Mac OS). The aspell() function in R was originally designed to evaluate documents outside of R – things like help files – rather than text strings in R. It was only after a long search through Stack Overflow that I found out that if you convert a string to a factor, aspell() can work with it.

The aspell() function takes a vector of words and returns a list of possible for corrections for any words that don’t appear in the dictionary. This is convenient as far as it goes, but it makes it difficult to quickly see which words were spelled correctly and which one’s weren’t. It also doesn’t help much with automatic correction. Duncan Temple Lang already has an [Aspell][2] package that helps with this, but I couldn’t get the package to install on my Mac and there doesn’t seem to be a version available for Windows. So I got frustrated and built my own wrapper for the base function.

So the AspellCheck() function in the linked code looks like this:

[sourcecode language="r"]  
AspellCheck(input, output = c(&#8220;eval&#8221;, “sugg”, “fix”), sep = FALSE, cap.flag = c(&#8220;none&#8221;, “first”, “all”), ignore=NULL, split.missing = FALSE)  
[/sourcecode]

The function takes a single character string as its input. The string can contain multiple words – the function will identify them by splitting the string wherever there’s a space. The output has three modes:

*   &#8220;eval&#8221; returns a logical vector indicating whether each word was found in the dictionary.
*   &#8220;sugg&#8221; returns a list where each misspelled word is given all suggested alternatives. Unlike the base function, this inserts NA as a placeholder for correctly spelled words, so the length of the output will be equal to the number of words in the input.
*   &#8220;fix&#8221; replaces each misspelled word with the word suggested as its most likely alternative. Proper nouns are not considered viable alternatives.

The eval and sugg outputs work just by comparing the input to the base aspell() output.

[sourcecode language="r"]  
check <- aspell(as.factor(x), control = c(&#8220;&#8211;master=en_US &#8211;sug-mode=fast&#8221;))  
[/sourcecode]

Calling as.factor() allows the function to evaluate the input. The control argument lists the specifics of how you want the words to be evaluated. The master argument above specifies that I want to use the U.S. English dictionary, and the sug-mode argument specifies that I want the fast mode of correction (the other options are “ultra”, “normal”, and “bad spellers.” I went with “fast” because “normal” and “bad-spellers” were a little too imaginative…they ended up replacing “Englishtheatre” with “incantatory.” I wanted the function to give up easier than that because I didn’t want it getting all creative with the survey data.

The fix output is just a little more complicated:

[sourcecode language="r"]  
ind <- mapply(grepl, pattern, check$Suggestions)  
ind.list <- is.list(ind)  
if(ind.list == T){  
ind <- unlist(sapply(ind, which.max))  
}else{  
ind <- which.max(ind)  
}  
picked <- rep(NA,length(ind))  
for(i in 1:length(ind)){  
picked\[i] <- check$Suggestions[!missing\]\[[i\]][ind[i]]  
}  
out <- x  
out[!good & !missing] <- picked  
[/sourcecode]

The first thing we do is create an index of spelling suggestions that fit a predefined pattern. Currently the function has two pattern options. If the &#8216;sep&#8217; option is set to FALSE (the default), the function takes the first suggestion that isn’t capitalized (e.g. isn’t a proper noun) and isn’t multiple words. If set to TRUE, then the function allows multiple words as suggestions. The if-else statement just provides two forms of picking the first suggestion that matches the pattern. The first form is for when there are multiple misspelled words, and the second form is for when there is a single misspelled word. I think there must be a better way of doing that, but I haven’t figured it out yet. We then roll all those picked suggestions into a single vector and use that to replace the misspelled words from the input string. So:

[sourcecode language="r"]  
x <- &#8220;this setnence is reelly mispeld&#8221;  
AspellCheck(x,&#8221;fix&#8221;)  
[1] &#8220;this sentence is really misspelled&#8221;  
[/sourcecode]

The function has a few other bells and whistles. The &#8216;cap.flag&#8217; option can cause the function to ignore capitalized words (so you don’t automatically spell-correct people’s names), or to ignore all-caps words (so you can flag words hat you want left alone). The &#8216;ignore&#8217; option allows you to just pass a vector of words that you want ignored.

If set to TRUE, the split.missing argument makes a call to the SplitWords() function, and is used in cases where AspellCheck() finds a misspelled word for which it can’t find any suggested alternative. I wrote the SplitWords() function because of the Bosnia project. I was running into a bunch of words that had been mushed together during the conversion from PDF to text – not a huge amount, but enough that I wanted to do something about it.  SplitWords() works this way:

[sourcecode language="r"]  
for(j in 1:length(z)){  
out <- &#8220;&#8221;  
keep <- 0  
while(keep != nchar(z[j]) |  
is.na(out[length(out)])){  
test.vec <- (keep+1):(nchar(z[j]))  
opts <- lapply(test.vec,function(i){c(substring(z[j],(keep+1),i))})  
opts <- unlist(opts)  
yes <- sapply(opts, check.fun)  
if(sum(yes) > 0){  
goods <- opts[yes]  
}else{  
goods <- &#8221; &#8221;  
}  
out <- c(out,goods[which.max(nchar(goods))])  
keep <- nchar(gsub(&#8221; &#8220;, &#8220;&#8221;, paste(out,collapse=&#8221;")))  
out <- out[out!=""]  
out <- paste(out, collapse=&#8221; &#8220;)  
}  
}  
[/sourcecode]

For each word to split, the function splits the word into every possible combination of two words. It then passes the first half of all of those word pairs to check.fun(), which is just a stripped down version of AspellCheck()’s “eval” setting. Of all the word options that are found in the dictionary, SplitWords() picks the longest, and then repeats the process for everything in the input string that is left over after that first part is taken out.  So:

[sourcecode language="r"]  
x <- &#8220;thissentenceisreallysquishedtogether&#8221;  
SplitWords(x)  
[1] &#8220;this sentence is really squished together&#8221;  
[/sourcecode]

I don’t prefer the pick-the-longest approach to choosing which words to accept, but that’s the only approach I can think of at this point that doesn’t involve an external table of words and frequencies. It wouldn’t work to pick the shortest since that would just pick a single letter every time. I guess I could go with some sort of probability approach based on number-of-character frequencies in the English language (based on something like [this][3], for example), but I think all that would do is ensure that really long and really short words weren’t picked as often. In the end, I prefer Peter Norvig’s [approach][4]: get a huge corpus of natural language texts and compute the frequency of each word in the corpus. Then, when SplitWords() returns multiple viable options, pick the option that occurs most frequently in the corpus. That would require me to create such a corpus…maybe from newspaper articles? I don’t know. I might work on that one later. For right now, SplitWords() serves the basic purpose of taking un-analyzable text strings and turning them into analyzable text strings. It’s not a complete solution, but it’s better than no solution at all.

Obviously, these functions shouldn’t be relied upon too heavily. If I had reason to believe a corpus had spelling errors widespread enough and irregular enough so as to substantially distort a systematic analysis of that corpus’s content, I would need to go through and manually spell-check the documents before I could use them. These functions are designed for cases where most of the words are just fine, but where there exist relatively small numbers of mostly minor spelling errors that would not grossly distort the analysis if left in place, but would possibly introduce some otherwise avoidable noise. Noise reduction is generally a good thing, and when it comes to text analysis, spelling correction is noise reduction. And, of course, these functions aren’t that useful until other kinds of messiness have already been taken care of – random insertion of numbers or strange Unicode characters, line breaks, and stuff like that. In my personal experience, cleaning up that kind of messiness is a difficult task, because all those non-spelling errors can be highly idiosyncratic. But for text data that is already fairly clean but could be cleaner, I’ve been happy with the results I’ve gotten from these functions so far.

 [1]: https://github.com/schaunwheeler/tmt
 [2]: http://www.omegahat.org/Aspell/
 [3]: http://person2.sol.lu.se/JoostVanDeWeijer/Texts/studling.pdf
 [4]: http://norvig.com/spell-correct.html