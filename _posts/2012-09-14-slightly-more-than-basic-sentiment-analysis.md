---
title: Slightly-more-than-basic sentiment analysis
author: swheeler
layout: post
permalink: /2012/09/14/slightly-more-than-basic-sentiment-analysis/
jabber_published:
  - 1347650306
email_notification:
  - 1347650307
categories:
  - Analysis
tags:
  - R
  - research
  - surveys
  - text mining
---
*[NOTE: Since writing this post, I revised many of the functions and repackaged them in my repo. You can now install them by first installing the devtools package, and then calling \`install_github("tmt", "schaunwheeler") in the R console.]*

I became interested in sentiment analysis a few months ago as a matter of pure practicality. The company I work for does a lot of customer-satisfaction surveys. Respondents rate various aspects of our products, but they also have the opportunity to answer a bunch of open-ended questions in their own voices. That kind of information can be really useful – it puts a face on the surveys, it can call attention to possibilities we never considered incorporating into standardized questions, and things like that.<!--more-->

My trouble was that we get hundreds and sometimes thousands of such responses, and since I’m the only researcher in the company I’m the only one available to make sense of them. While it would be nice to be able to give each comment individual attention, I just don’t have time to read through everything. The comments I’m most interested in are the extremely positive and extremely negative ones. The particularly positive comments contain information and verbiage that could potentially be used in promotional materials or just in informing sales people and customer service personnel that someone appreciated their work. The particularly negative comments are important because they might contain information about particular needs or problems that ought to be addressed with the customer individually.

There are [lots][1] and [lots][2] and [lots][3] of tools out there to mine text data for sentiment, all with different price points and capabilities. I prefer working with R because it’s free and because I’m already familiar with it, and also because it already has a [bunch of tools][4] for natural language processing. The \`tm\` package seems to be one of the most often used of these tools, but as I mentioned in my last post, tools available in \`tm\` assume more cleanliness and standardization than is realistic for my purposes. Also, the \`tm\` package functions (as far as I can tell) focus on individual words, but there are times when I need to flag particular phrases in addition to individual words. This post is about a few functions I created to help me do that.

As with the functions described in my last post, you can load the functions discussed below in the R console:

[sourcecode language="r"]  
source(&#8220;https://raw.github.com/schaunwheeler/tmt/master/R/tmt.R&#8221;)  
[/sourcecode]

The easiest way to assess the sentiment of a text is to get a list of words that typically convey sentiment and see how many of those words are in the text. There are several lists out there – you can see an overview of some of them [here][5] – and of course I couldn’t be satisfied with using just one. I picked three lists: from the [General Inquirer][6], from [Finn Årup Neilson][7], and from [Bing Liu][8]. All the lists had particular strengths – the GI list is the oldest, Liu’s is targeted for analysis of social media text, etc.

So I wrote a convenience function called MakeWordLists(). Enter in a character vector that includes any combination of “gi”, “afinn”, and “liu”, and the function will download the lists (GI and AFINN from their respective sites, the Liu list from my Github account since Liu’s lists were originally compressed into a RAR archive and I can’t figure out how to automate the decompression of RAR files from within R), de-dupe them, alter the words to make them usable as regular expressions (more that below), and de-conflict them with the list of English stop words available from the \`tm\` package. The function gives as its output a list of positive words, and list of negative words, and a list of stop words that won’t conflict with the positive or negative lists.

The last time I ran this (I don’t know how often any of the sources update their lists), all three lists combined contained 3472 positive words and 7211 negative words. After just removing obvious duplicates (anything that appeared more than once in the combined lists), those numbers dropped to 2723 and 5658. After cleaning and fitting for regular expressions, the final list contained 1501 positive word patterns and 3140 negative word patterns, for a total difference of 3740 words (about  44% of the what was there after simply de-duping).

I mentioned [regular expressions][9], which I see as the best way to deal with messy text data and to avoid reliance on individual-word matches when doing things like sentiment analysis. The original lists made some assumptions about how people would write certain words. For example, “user-friendly” could also be written as “user friendly” or “userfriendly”. Regular expressions allow us to find any instance where the words “user” and “friendly” are separated by a hyphen, a space, or nothing at all. Regular expressions also allow us to take advantage of the \`tm\` (and \`Snowball\`) packages’ stemming capabilities. Stemming takes words like “undoubted” and “undoubtedly” and shortens them both to “undoubt”. If working just with straightforward whole-word matching, we’d have to stem whatever documents we wanted to analyze since I don’t think anyone uses the word “undoubt” all by itself without any affixes. With regular expression we can match any instance where a word starts with “undoubt”, and so catch “undoubted” and “undoubtedly” with the same pattern.

I also threw in a couple other goodies, such as allowing words with commonly-repeated characters to be matched no matter how many times the character is repeated (so we can match “wow” and “woooooooooow” and everything in between).

Once we have the pattern lists, we can analyze some actual texts. The GetSentiment() function takes three arguments – a vector of texts, a vector of positive patterns, and  vector of negative patterns – and gives a variety of measures summarizing how many times those positive and negative patterns appear in each text:

[sourcecode language="r"]  
poslist <- lapply(posind, function(i){  
first <- mapply(function(x,&#8230;){sum(x!=(-1))},  
gregexpr(paste(&#8220;\b&#8221;,pos[i],&#8221;\b&#8221;, sep=&#8221;"), vec))  
fake <- mapply(function(x,&#8230;){sum(x!=(-1))},  
gregexpr(paste(&#8220;(not|no)\s(\w+\s)?&#8221;,pos[i],&#8221;\b&#8221;), vec))  
out <- first-fake  
setTxtProgressBar(pb, i)  
out  
})  
[/sourcecode]

The “posind” object is just a numerical index running from 1 to the length of the positive-pattern vector. For each of those patterns, we count up the number of occurrences in each text, then we count up the number of “fake” occurrences – instances where the pattern is preceded by the words “no” or “not”, with the option of having one word in between. So the string “the show was not very good” would show one positive pattern (“good”) and one fake positive pattern (“not very good”). We sum up the counts for all positive words for each text, then subtract the sum of all fake positive counts for each text, and then subtract our total count of fakes from our raw total to give us an estimate of how many times positive sentiment is expressed in each text.

We then do the same thing for the negative lists and also get a count of total words in each text. With those three lists of counts, we can create a few additional measures: &#8216;polarity&#8217; gives the differences between the number of positive and number of negative words in each text, divided by the total number of sentiment words; &#8216;subjectivity&#8217; gives the total number of sentiment words divided by the total number of words in general; &#8216;positivity&#8217; and &#8216;negativity&#8217; give the total of positive or negative words, respectively, divided by the total number of words; and &#8216;balance&#8217; gives the number of positive words minus the number of negative words, divided by the total number of words. So:

[sourcecode language="r"]  
x <- c(&#8220;this is a super happy comment&#8221;,  
&#8220;this is a bad, ugly, horrible comment&#8221;,  
&#8220;this comment has both bad and good parts&#8221;)  
GetSentiment(x,pos,neg)  
[1] &#8220;evaluating positive words&#8221;  
|==================================================================================| 100%  
[1] &#8220;evaluating negative words&#8221;  
|==================================================================================| 100%  
words positives negatives   polarity subjectivity positivity negativity    balance  
1     6         2         1  0.3333333    0.5000000  0.3333333  0.1666667  0.1666667  
2     7         0         3 -1.0000000    0.4285714  0.0000000  0.4285714 -0.4285714  
3     8         1         1  0.0000000    0.2500000  0.1250000  0.1250000  0.0000000  
[/sourcecode]

I prefer the balance measure, because it weights the counts by the verbosity of each text – I’m interested if someone uses a high number of positive or negative words, but I’m more interested if those positive or negative words make up a high percentage of everything the person wrote.

Once we have some measure of sentiment, we can look at which terms in the original texts tended to occur most frequently in positive or negative texts. To do this, I wrote the WordsBySentiment() function. You put in the original texts, along with a vector of scores (which could be the same length as the vector of texts), and specify the number and type of output you want. Output types are “freq”, “subj”, or “both”. The “freq” option picks the top n most frequent words from the whole corpus and tells you how often they occur in positive or negative texts. The “subj” option picks the top n most frequent words from the positive and negative texts themselves. The “both” option does both. The default for the function is take a binary view of word occurrence – texts are evaluated by whether or not that any number of particular words in them, and the output summarizes information about how much of the total corpus exhibited certain characteristics. So the default is to count a text that contains nine instances of the word “bad” and a text that contains one instance of the word “bad” as having the same amount of “badness”. So:

[sourcecode language="r"]  
x <- c(&#8220;this is a super happy comment&#8221;,  
&#8220;this is a bad, ugly, horrible comment&#8221;,  
&#8220;this comment has both bad and good parts&#8221;)  
y <- GetSentiment(x,pos,neg)  
WordsBySentiment(x,y$balance)  
terms frequency positive negative difference subjectivity type  
1 comment         3        1        1          0    0.6666667 both  
2    this         3        1        1          0    0.6666667 both  
[/sourcecode]

I wrote one more function to provide a convenient way to pre-process the texts to be entered into WordsBySentiment(). I don’t prefer the practice of stemming words in order to analyze them – I think regular expressions are a bit more versatile – but I do like the practice of stemming and re-stemming to present the findings of a text analysis. If I want to know what words tend to occur within sentiment-laden texts, I don’t want “problem”, “problems”, and “problematic” to all be treated as different. WordsBySentiment takes a vector of texts, as well as a list of stop words to remove if the clean setting is set to the default “true” setting.  The function stems all words, spell checks the stems and keeps all words whose stems make sense all by themselves (so “helpful” is stemmed to “help” and stays that way), and re-append endings onto stems that don’t make sense all by themselves (so “experienced” is stemmed to “experi” but gets turned back into “experience”). So the function does the useful part of stemming – is standardizes words – but it makes sure the output the stemming is intuitively understandable.

Now, none of this is heavy-duty sentiment analysis. For that, I’d probably need to do some [tokenizing][10] or some [latent semantic analysis][11]. But these functions allow me to efficiently classify and summarize large amounts of text data without having to read through each individual record or code anything by hand.

 [1]: http://breakthroughanalysis.com/2012/01/08/what-are-the-most-powerful-open-source-sentiment-analysis-tools/
 [2]: http://www.optify.net/social-marketing/sentiment-analysis-metrics-tools-part-2
 [3]: http://www.fieldassignment.com/2011/04/free-sentiment-analysis-tools.html
 [4]: http://cran.r-project.org/web/views/NaturalLanguageProcessing.html
 [5]: http://sentiment.christopherpotts.net/lexicons.html
 [6]: http://www.wjh.harvard.edu/~inquirer/
 [7]: http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010
 [8]: http://www.cs.uic.edu/~liub/FBS/sentiment-analysis.html#lexicon
 [9]: http://en.wikipedia.org/wiki/Regular_expression
 [10]: http://en.wikipedia.org/wiki/Tokenization
 [11]: http://en.wikipedia.org/wiki/Latent_semantic_analysis
