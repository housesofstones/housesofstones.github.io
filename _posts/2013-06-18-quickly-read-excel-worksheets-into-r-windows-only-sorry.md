---
title: 'Quickly read Excel worksheets into R (Windows only&#8230;sorry)'
author: Schaun Wheeler
layout: post
permalink: /2013/06/18/quickly-read-excel-worksheets-into-r-windows-only-sorry/
categories:
  - Data Collection
  - Uncategorized
tags:
  - R
---
I suppose most companies use the Microsoft Office suite of programs, and my office is no exception. It easy to import data from an API or a database into R, but importing data from an Excel workbook is a different story. There are a few R packages for reading Excel files, but I’ve had problems with all of them:

*   **\`read.xlsx\` (\`gdata\` package)**: pretty convenient to run in R, but requires Perl which for some reason I have a hard time installing on my Windows machine…that might just be an issue with me, not the machine.

*   **\`odbcConnectExcel2007\` (\`RODBC\` package)**: from what I’ve seen on the listservs, this one has a hard time reading xlsx files because of a driver mismatch – you have to access the files through 32-bit R, which is annoying.

*   **\`readWorksheetFromFile\` (\`XLConnect\` package):** uses Java, easy to install, and has tons of functionality to write in addition to read, but I don’t really need the write functionality and for large files especially XLConnect is very slow.

So I set off in search of a faster way to pull information out of an Excel file. The[ gist][1] below shows what I came up with. Excel already has Visual Basic capabilities built in. So I stole a little VB script from [here][2] and stuck it in a function that writes the script to a temporary file, calls the script from the command line, and then outputs the contents of the formerly-Excel file.  
<!--more-->

  
The function takes the following inputs:

*   **file_path**: the full path of the Excel file
*   **keep_sheets**: the names of the sheets you want to keep; extracts all sheets if NULL
*   **target_dir**: the directory to which you want to output the excel sheets; defaults to the directory where the Excel sheet is kept. If set to FALSE, it doesn’t output any files – rather, it reads them all into R as a list of data frames.

Unfortunately, this only works on Windows. I had hoped it would work on a Mac where Excel was installed, but I haven’t had any luck getting it to work on my home computer.

{% gist schaunwheeler/5805242 %}

 [1]: https://gist.github.com/schaunwheeler/5805242
 [2]: http://jeffkinzer.blogspot.com/2012/06/vbscript-to-convert-excel-to-csv.html
