---
title: Sometimes I think we don’t deserve good data
author: Schaun Wheeler
layout: post
permalink: /2012/10/04/sometimes-i-think-we-dont-deserve-good-data/
jabber_published:
  - 1349355961
email_notification:
  - 1349355967
publicize_reach:
  - 'a:3:{s:7:"twitter";a:1:{i:1566504;i:8;}s:2:"fb";a:1:{i:664462;i:206;}s:2:"wp";a:1:{i:0;i:38;}}'
categories:
  - Data Collection
tags:
  - data
  - Google
  - ngram
---
*I wrote the following post yesterday afternoon as a way of venting, but I didn&#8217;t get around to posting it till this morning.*

Consider this post a continuation of my post on [opportunistic analysis][1]. This is me decompressing after many hours of frustrating and unfruitful attempts to get some data that is supposedly freely downloadable.

I’ve written recently about [sentiment analysis][2], and created a few tools to estimate the positive or negative sentiment expressed in a text by counting the number of positive and negative words that appear in that text. Positive and negative words are identified by lists – people uses different approaches to decide if a word carries a particular sentiment. This approach has many drawbacks. For example, Greg Tucker-Kellogg [wrote][3] recently on his blog how words such as “please” can often get defined as a positive word, which causes problems when a word with “please” defined as positive gets used to analyze the comment “please slow down.” The comment is identifying a problem, but it would be rated as positive because of the word.<!--more-->

One way to get around this problem, instead of trying to determine which words “really” are positive or negative, is to weight the words. If “please” gets defined as only a little positive, its effects on an overall sentiment estimate can more easily be minimized or reversed by the presence of other words that might more clearly convey positive or negative emotions. Several sentiment word lists already do this. For example, the [AFINN][4] list scores each word on a scale from -5 (extremely negative sentiment) to +5 (extremely positive sentiment).

Of the different scored lists that are out there, and there are [several][5], it seems that most of the scores are created by having a whole bunch of people rate the words. The lists are considered adequate when using the lists to score a text results in a sentiment estimate that matches estimates made by actual human beings.

This got me thinking about what kinds of words might be scored as more positively or negatively by human raters. For example, I think most people would rate “spectacular” as being a stronger positive word than “good”, but you don’t need to have people rate words for you to know that:

[<img class="alignnone size-full wp-image-288" title="chart" src="http://housesofstones.com/blog/wp-content/uploads/2012/10/chart.png" alt="" width="900" height="330" />][6]

The above graph, taken from [Google’s ngram viewer][7], shows the relative usage of “good” and “spectacular” in books from 1950 through 2000. “Good” is consistently used much more often than “spectacular”, which makes sense if we assume that the majority of most people’s day-to-day experiences are pretty average on the scale from positive to negative. That’s [the point][8] of emotions &#8211; to help us remember particularly good and particularly bad experiences.So sentiment-laden words that are used less frequently might represent emotional experiences that are experienced less often, and therefore word frequency in a really large corpus might act as proxy for the strength of the sentiment, with higher usage indicating lower strength.

If I’m right, then all I’d have to do is take the frequency of different sentiment words and scale it &#8211; maybe log it and then scale by twice the logged standard deviation or something &#8211; to get a reasonable strength scale without having to having people rate the words.

Here’s where my frustrations started. As I mentioned, the above graph was from Google’s ngram viewer. Google actually makes those ngram data sets [public][7], so I figured all I would have to do is download the data and calculate frequencies. And thus commenced a whole day of hitting my head against the wall. Google has two versions of its English data sets. Version 1 was created in 2009 and version 2 was created in July of this year. Version 1 is split into 9 equally-sized zip archives, while version 2 can be split equally or by initial letter, and is gzipped.

I can’t download version 2. Every time I click on the file, I get this:

[<img class="alignnone size-full wp-image-290" title="error" src="http://housesofstones.com/blog/wp-content/uploads/2012/10/error1.png" alt="" width="960" height="192" />][9]

This happens in Chrome. If I hold my nose and try it in Internet Explorer, Microsoft gives me a message that I can’t download it and says that’s probably because I didn’t enter a password.

But, hey, I was just interested in a rough, proof-of-concept sort of activity, so I can just use version 1, right? Wrong. I can download it just fine. I can unzip it just fine. This is what I get when I open it.

<table width="160" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td valign="center" nowrap="nowrap" width="32">
      $0.00
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      1903
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      2
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      2
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      2
    </td>
  </tr>
  
  <tr>
    <td valign="center" nowrap="nowrap" width="32">
      $0.00
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      1906
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      2
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      2
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      2
    </td>
  </tr>
  
  <tr>
    <td valign="center" nowrap="nowrap" width="32">
      $0.00
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      1908
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      4
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      4
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      4
    </td>
  </tr>
  
  <tr>
    <td valign="center" nowrap="nowrap" width="32">
      $0.00
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      1909
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      18
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      13
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      13
    </td>
  </tr>
  
  <tr>
    <td valign="center" nowrap="nowrap" width="32">
      $0.00
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      1910
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      2
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      2
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      2
    </td>
  </tr>
  
  <tr>
    <td valign="center" nowrap="nowrap" width="32">
      $0.00
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      1911
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      6
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      6
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      5
    </td>
  </tr>
  
  <tr>
    <td valign="center" nowrap="nowrap" width="32">
      $0.00
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      1912
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      5
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      3
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      3
    </td>
  </tr>
  
  <tr>
    <td valign="center" nowrap="nowrap" width="32">
      $0.00
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      1913
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      9
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      9
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      9
    </td>
  </tr>
  
  <tr>
    <td valign="center" nowrap="nowrap" width="32">
      $0.00
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      1914
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      9
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      8
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      8
    </td>
  </tr>
  
  <tr>
    <td valign="center" nowrap="nowrap" width="32">
      $0.00
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      1915
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      2
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      2
    </td>
    
    <td valign="center" nowrap="nowrap" width="32">
      2
    </td>
  </tr>
</table>

The second column is the year in which the word occurred. The third column is the number of times the word occurred. The fourth column is the number of pages on which the word occurred. The fifth column is the number of books in which the word occurred. The first column is the word.

Oh, wait. No, it’s not. It’s a dollar sign followed by some digits. As I go down the list, the digits change, but in every case the word column just contains dollar signs followed by digits. And that happens for any of the nine partitions of the full 1-gram data set. I checked them all.The second column is the year in which the word occurred. The third column is the number of times the word occurred. The fourth column is the number of pages on which the word occurred. The fifth column is the number of books in which the word occurred. The first column is the word.

But you know what, that’s not what frustrates me. Ok, that’s a lie. This really frustrates me. But as much as I’m irked by my inability to get the data that’s supposedly just sitting there for the taking, I’m more irked at what I found when I searched for solutions to my problems.

I was able to find [one question][10] on Stack Overflow that, I think, is describing the problem I had with the version 1 data, but the one reply didn’t realize that the original poster was talking about the raw data and just directed him to the download site. I was able to find one other question on, I think, a listserv (I can’t for the life of me find it now) that mentioned that all of the words were appearing as number/symbol combinations. I couldn’t find a single person talking about not being able to download the Version 2 files. So that means one of three things:

1.  I am just one incredibly unlucky person to have all of Google’s ngram data sets fail for me but for no one else.
2.  I’m really dumb to not see that I’m obviously doing something wrong here.
3.  People aren’t using the data sets all that much.

I think 1 is unlikely to the point of being implausible. I think 2 is more likely than 1 but I’d like to think I’m smart enough to download a .gz file or open a tab-delimited file in R. That leaves 3, and thinking back over the many, many dead-ends Google gave me today as I searched for answers to my problem, it really does seem that people are doing remarkably little with the data. For example, if you look at [this site][11], there are lots of people who are going to the ngram viewer, entering two or three words, and then speculating wildly about the picture that results. See [this][12] Stack Exchange  for a discussion of all the silly ways people are thinking very little about the conclusions they derive from the graphs.

A solution to this would be, of course, to get the raw data and do some more rigorous and systematic research on the data sets. In fact, maybe I’ll do that! I can make some time to download the files, then I…oh.

I’m frustrated that I can’t get the data, but Google isn’t exactly known for its customer service, so I can’t fault them too much for not caring enough to search out and fix whatever problem it is that’s preventing me from getting what I want. I am frustrated that there are so many people using the ngram tool to spin narratives rather than do actual research. I suspect that if more people were trying to use the data, more people would be encountering the kinds of problems I’ve encountered, and so more people would be writing about those problems, which means those problems would get noticed and fixed.

What we need are fewer people who are content to base our arguments on some graph that Google (or SPSS, or – less frequently – R) spits out at us. We get better data by using bad data and then letting people see how frustrating it is to use bad data. But if we never try to use even the bad data beyond a few automated outputs, we’ll never even see that it’s bad data, and we certainly won’t get anything better in the long run.

[UPDATE, 10/5/2012: Whoa. I just went back to the Google ngram data site on a whim (actually, I&#8217;ve been obsessing over it a little since I wrote this post. All of the version 2 data sets are gone, including all mention of them in the data descriptions. However, if you look at the snippet that shows up below the link on the Google search, you can clearly see that it mentions version 2. I&#8217;m downloading the version 1 set now to see if gobbledygook still shows up in place of the ngrams.

[<img class="alignnone size-full wp-image-295" title="google" src="http://housesofstones.com/blog/wp-content/uploads/2012/10/google.jpg" alt="" width="768" height="240" />][13]

&nbsp;

&#8230;Nope. I&#8217;m still just getting number/symbol combinations in the word column no matter which file I pull.

 [1]: http://houseofstones.wordpress.com/2012/02/07/opportunistic-analysis-sounds-easier-than-it-really-is/
 [2]: http://houseofstones.wordpress.com/2012/09/14/slightly-more-than-basic-sentiment-analysis/
 [3]: http://tucker-kellogg.com/blog/2012/09/30/quantifying-student-feedback-using-org-mode-and-r-2/
 [4]: http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010
 [5]: http://nlp.uned.es/~jcalbornoz/papers/LREC_2012.pdf
 [6]: http://housesofstones.com/blog/wp-content/uploads/2012/10/chart.png
 [7]: http://books.google.com/ngrams/datasets
 [8]: http://pages.uoregon.edu/harbaugh/Readings/Neuroscience/Kid%20bargaining.pdf
 [9]: http://housesofstones.com/blog/wp-content/uploads/2012/10/error1.png
 [10]: http://stackoverflow.com/questions/7714311/save-google-ngram-result-as-csv
 [11]: http://www.informationisbeautiful.net/visualizations/google-ngram-experiments/
 [12]: http://meta.english.stackexchange.com/questions/2469/should-we-allow-google-ngrams-to-be-presented-as-statistical-evidence-without-qu
 [13]: http://housesofstones.com/blog/wp-content/uploads/2012/10/google.jpg