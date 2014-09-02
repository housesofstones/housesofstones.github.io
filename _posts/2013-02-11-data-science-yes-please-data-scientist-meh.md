---
title: Data science? Yes, please. Data scientist? Meh.
author: swheeler
layout: post
permalink: /2013/02/11/data-science-yes-please-data-scientist-meh/
jabber_published:
  - 1360592545
email_notification:
  - 1360592547
tagazine-media:
  - 'a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";i:0;s:6:"author";s:8:"20450928";s:7:"blog_id";s:8:"32115977";s:9:"mod_stamp";s:19:"2013-02-11 14:22:21";}'
publicize_twitter_user:
  - SchaunW
publicize_reach:
  - 'a:2:{s:7:"twitter";a:1:{i:1566504;i:23;}s:2:"wp";a:1:{i:0;i:49;}}'
categories:
  - Analysis
  - Design
  - Implementation
  - Organizations
tags:
  - Big Data
  - data science
  - organizational transformation
  - science
  - teams
---
I wrote [a post][1] a while ago about not being sure if I wanted to call myself a data scientist. The post was less about what title I wanted to ascribe myself and more about the many divergent ways “data science” seems to be defined. At the time, I wrote:<!--more-->

> <p dir="ltr">
>   Over the last several months, I’ve seen a lot of myself in people’s descriptions of “data scientists.” I think that term is funny – is it used in juxtaposition to scientists who don’t use data?
> </p>

Looking back now, I think I was allowing the syntax of the phrase “data science” to drive my thinking about it. I assumed it was appropriate to treat the term “data” as modifying “science” – that data science is science that focuses on data. I’ve come to find it more useful to see it instead as the practice of taking a scientific approach to data. There’s no consensus definition of “science” any more than there is a consensus definition of “data science,” so here’s what I mean by science:

> <p dir="ltr">
>   Science, for my purposes here, is the practice of explicitly defining a set of propositions about the existence, co-occurrence, or explanation of some set of behaviors or events, then explicitly defining the conditions under which flaws in those propositions would most likely be exposed, and then systematically collecting and analyzing observations under those specified conditions. More intuitively (and succinctly): science aims to establish a “reason to believe” something by systematically trying and failing to find reasons to not believe that thing.
> </p>

So the guiding principle here seems to be “make it hard to believe your ideas.” Taking a “scientific approach” to a problem means we do what we can to find cases where the data refutes our ideas and then we document our activities explicitly so others can see how we reached our conclusions by looking at our documentation rather than having to go out and test those ideas personally. I think this definition fits most accounts of how science actually happens in practice (for example: [here][2] and [here][3]). But more important, for me at least, is that this definition embodies an approach to data that seems to be almost entirely absent from the world of government, business, non-profits, and other settings where people make decisions that impact others’ well-being in real time.

<b id="internal-source-marker_0.6802780779544264"><a href="http://dilbert.com/strips/comic/2010-08-11/"> <img alt="" src="https://lh4.googleusercontent.com/dZvJdlSTGBUQMVBHhkdQpEb_Y53sv6-ZlWhJEC0yvGGxqnqq7NDxDwB96eH4SMNHUfx7GdEoTcNgWMVTeBhypUCqH_r8q1eWvt9U-uU_HvjRCgtv2Dg95A1Gza-4kDvsuA" width="624px;" height="194px;" /></a><br /> </b>

<b id="internal-source-marker_0.6802780779544264"><span style="font-weight:300;">Data science is garnering its share of skeptics, some raising </span><a style="font-weight:300;" href="http://www.attiviogithub.io/55-industry-insights/1195-big-data-morphs.html">valid concerns</a><span style="font-weight:300;">, some just </span><a style="font-weight:300;" href="http://scn.sap.com/community/business-trends/blog/2013/01/07/data-science-buyer-beware">hand-waving</a><span style="font-weight:300;">. Most of the skepticism seems to focus on the issue of whether loads and loads of data can really be as useful as the </span><a style="font-weight:300;" href="http://hbr.org/2012/10/data-scientist-the-sexiest-job-of-the-21st-century/ar/1">Harvard Business Review</a><span style="font-weight:300;"> claims. I think the real concern, and this applies to </span><a style="font-weight:300;" href="http://houseofstones.me/2012/11/13/big-data-of-all-sizes-how-to-turn-a-regular-organization-into-a-data-driven-organization/">small</a><span style="font-weight:300;"> data just as much as it does to big data, it whether and to what extent businesses and other organizations will really and regularly allow data to temper conventional wisdom.</span></b>

In organizational settings, I’ve rarely seen data given the respect it deserves. (Dealing with those types of settings was the topic of [three][4] [recent][5] [posts][6]). There are of, course, ready examples of organizations that do let data drive their decisions ([here][7] and [here][8], to name just two). But those seem to be the exceptions. It’s just not that common to find businesses who say “Here’s what I think is going on. Let’s see if we can prove that wrong.” But that’s exactly what science does. As Allen Orr [writes][9], “plenty of scientific truths are counterintuitive (does anyone find it intuitive that we’re hurtling around the sun at 67,000 miles per hour?) and a scientific education is, to a considerable extent, an exercise in taming the authority of one’s intuition.”

Nearly every day, I come across some article or discussion that asks “what makes a good data scientist?” My personal answer to that question is “at least two.” In other words, if you’re thinking about a data scientist as a set of skills embodied by a single person, you’re probably thinking about data science all wrong. Discussions of data science often portray data scientists as individual people who have the technical skills to handle lots of data and direct it to satisfy business objectives. Some of these portrayals mention that data scientists need to “know how to ask good questions” or “know how to communicate complex findings” but they seem to assume that those questioning/communications skills are properties of individuals. They usually aren’t.

There are a great many things humans are good at. Identifying [weaknesses][10] in our own reasoning is not one of them. Neither is recognizing the extent to which we’ve [overestimated][11] our communication. This is the reason I think limited, one-time [peer review][12] of scientific research is a bad idea, and it’s why I think a data science initiative comprised of only one data scientist isn’t going to end up doing much actual data science. A single person might be able to get the data into formats that are query-able and know how to apply all sorts of methods to analyze that data, but I’m skeptical about any single person’s ability (including my own) to tame their own intuition enough to consistently subject their and others’ ideas to the scrutiny that a scientific approach demands. It seems an organization that really wants to do data science needs to worry less about Hadoop and more about what they’re doing to ensure that skepticism can thrive. I think if more executives realized this there would be a little less hand wringing about the [shortage][13] of data scientists. You don’t need a person who understands the math behind the models, who can actually implement those models, and who can communicate the findings. You need people who can do some of those things who can work together. In fact, I would tend take that team of partial skills over an all-in-one solution, because the team would at least provide the possibility that each team member would individually receive a more skeptical treatment of his or her ideas.

Nearly any field that can or ought to be called “science” has moved beyond the point where a truly insightful or useful finding can result from the work of a single person. I don’t know that we have a clear enough view of history to conclude that science used to be something a single person could do. Regardless of whether it was do-able in that past, it’s not do-able now. Science needs teams. Data science is no exception. If science is about systematically trying to kill our pet ideas, we need more than one person in an organization working on that, because if you set out to attack pet ideas, you will almost certainly kill a few. No one but a scientist can find an upside in that outcome. A single person probably can’t (and certainly shouldn’t have to) handle the resulting blowback.

Most organizations aren’t used to handling terabytes of data or using machine learning techniques. I’m willing to bet even fewer are used to putting data on equal footing with an executive’s opinion. I think data science can be just as painful and rewarding as any other scientific endeavor. The pain and reward come together. That’s just science.

 [1]: http://houseofstones.me/2012/09/06/trying-to-figure-out-why-i-dont-want-to-call-myself-a-data-scientist/
 [2]: http://www.amazon.com/Creating-Scientific-Concepts-Bradford-Books/dp/0262141051
 [3]: http://en.wikipedia.org/wiki/Demarcation_problem
 [4]: http://houseofstones.me/2012/11/15/bottom-up-creation-of-data-driven-capabilities-automate-your-work/
 [5]: http://houseofstones.me/2012/11/28/bottom-up-creation-of-data-driven-capabilities-weak-supporters-10-strong-support/
 [6]: http://houseofstones.me/2012/12/05/bottom-up-creation-of-data-driven-capabilities-show-dont-tell/
 [7]: http://smartdatacollective.com/bernardmarr/85871/analytics-google-great-example-data-driven-decision-making
 [8]: http://www.businessweek.com/articles/2012-11-29/the-science-behind-those-obama-campaign-e-mails?56a4b19d=t
 [9]: http://www.nybooks.com/articles/archives/2013/feb/07/awaiting-new-darwin/?pagination=false
 [10]: http://www.sjsu.edu/people/anand.vaidya/courses/c5/s2/Why%20Do%20Humans%20Reason%20Sperber.pdf
 [11]: http://5harad.com/papers/friendsense.pdf
 [12]: http://houseofstones.me/2012/06/13/we-dont-need-better-research-we-need-more-research-with-search-options/
 [13]: http://online.wsj.com/article/SB10001424052702304723304577365700368073674.html
