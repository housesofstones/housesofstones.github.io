---
title: Quickly read Excel (xlsx) worksheets into R on any platform
author: swheeler
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

{% gist schaunwheeler/5825002 %}

 [1]: http://housesofstones.github.io/2013/06/18/quickly-read-excel-worksheets-into-r-windows-only-sorry/
 [2]: https://github.com/dilshod/xlsx2csv
 [3]: http://rpy.sourceforge.net/rpy2.html
 [4]: http://stackoverflow.com/search?q=%5Br%5D%2C+%5Bxml%5D
 [5]: https://stat.ethz.ch/pipermail/r-help/2011-March/270455.html
