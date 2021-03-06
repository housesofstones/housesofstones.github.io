---
title: The data-scientist-as-mechanic
author: swheeler
layout: post
permalink: /2017/03/07/the-data-scientist-as-mechanic/
description: Data science is a young enough profession that there are still a lot of debates about what data scientists actually do. If we're still having those debates 10 years from now, we'll be in trouble, but for right now I think it's healthy.
---

"Data science" is a young enough profession that there are still a lot of debates about what data scientists actually do. If we're still having those debates 10 years from now, we'll be in trouble, but for right now I think it's healthy.

[Drew Conway's venn diagram](http://drewconway.com/zia/2013/3/26/the-data-science-venn-diagram) is useful for beginning a conversation about data science, but becomes less useful as the conversation shifts to questions of how to hire a data scientist or set up a standing data science capability within a company. Conway's diagram shows  data science as the intersection of statistics, software development, and substantive expertise. Practical hiring and implementation needs raises the question of just how big that intersection is. If you read job descriptions for data scientist positions,it's common to see people say they want a "data scientist" when they really want a statistician who can code just a little bit or a software developer who can fit a model or a coder who has in-depth knowledge of a particular industry - all asking for a different sized and shaped intersection of essentially the same three skills sets.

Often, companies want data science but they don't have a great idea of what that means so they ask for a union of the three skills sets instead of an intersection. That leads to companies passing over qualified candidates who didn't have certain specific skill sets that the company didn't need anyway, which leads to data science initiatives languishing...or at least taking longer to get off the ground than they need to. It also perpetuates the myth of the data scientist as a unicorn.

As someone who has both hired data scientists and who has been hired as a data scientist, I've [tried to figure out](http://housesofstones.github.io/2013/02/11/data-science-yes-please-data-scientist-meh/) what exactly I mean when I use the term. For the time being, I think I've settled on the following analogy:

Data science is like a car: it's one of the ways to get from where you are to where you want to be. In traditional (less-data-science-driven) businesses, most people are like drivers. The best drivers have a good feel for the road, an eye for noticing risks and opportunities, and instincts that help them react well to new events. Drivers want a high-quality machine that is in good working condition. When that machine falls out of good working condition (as machines do), they want a new machine or they want the old machine fixed.

And this is where I see two different analogies for data science:
* Data scientist as automotive engineer: these are the people who can implement algorithms from scratch and have a very heavy math/CS background. They can take a new idea - say, something like [this](https://arxiv.org/abs/1702.08835), fairly new as of the writing of this post - and create a workable version in their language of choice.
* Data scientist as mechanic: these are people who can look at business problems and map them to available technical solutions. They can also stress-test those technical solutions to decide how reliable they are, and diagnose and fix problems when the idiosyncrasies of real-world data cause friction.

Both roles are important. The data scientist as automotive engineer is especially good at getting us cars that suit our needs. The data scientist as mechanic is especially good at getting more mileage out of the cars we already have. Both roles require serious technical skills.

When hiring a data scientist, the first question shouldn't be "what skills do I need?". It should be "do I need an engineer or a mechanic (or both)?" Here's how I tend to go about answering that question:

1. There are things humans spend time on that computers can do just as well. These things are more-or-less automatable.
2. There are things humans spend time on that have pieces that computers can help with - the computers can give us options or assess risk or otherwise take care of the part of the decision-making process. These things are not automatable, but they are augmentable.
3. There are things humans spend time on that computers can't do very well at all. These things are not really automatable.

No one has enough time to take care of everything that falls into category #3. If we had nothing else to do, we'd still fill up all of our time taking care of category #3.
* If you don't have enough time to take care of category #3 because of things that fall into category #1, hire the automotive-engineer type of data scientist.
* If you don't have enough time to take care of category #3 because of things that fall into category #2, hire the mechanic type of data scientist.
* If you aren't sure why you don't have time to take care of category #3, you should spend some more time thinking about and getting advice on your business before trying to throw a person at the problem, but if you're impatient then you should hire the mechanic type of data scientist.

When in doubt, I think you should hire the mechanic over the engineer because it limits the risk of a systemic waste of resources. If you have someone who is trained and ready to build you a tool from scratch, when really all your business needs is to use one the tools already out there - and since most data science tools are open-sourced, there are a whole lot out there - then you stand a pretty good chance of reinventing the wheel. But if you have someone who is trained to set up, calibrate, and troubleshoot the tools that are already out there, when really you do need a whole new tool, that person will try to use the available tools and fail to get the outcome you want. If they're a good mechanic, they'll tell you that that means you need to hire an engineer. If they're a bad mechanic, they won't tell you, but their failure will make it obvious. Unless you don't know what success looks like for your business. Then you won't notice, but it won't really matter - just like it wouldn't really matter whether you had a mechanic or an automotive engineer if you didn't know how to drive.

Tech companies especially tend to need the engineer type of data scientist. These companies are built on the assumption that tons of decisions need to be automated, and that many if not most of those automatable decisions will be based on data generated from the company's own product - information pipelines that they can more-or-less control.

Not all companies are tech companies. I see a lot of companies that have survived for years with little reference to data outside of basic financial KPIs. Many of these companies see the success of data-science initiatives in various sectors and want to get in on that. Most of these companies don't need an engineer. They need a good mechanic. Most of these companies have major brick-and-mortar components to their operations - things that they don't even have reliable data on. The majority of decisions in these companies occupy that gray area (category #2, above) between the more-or-less automatable stuff and the not-really-automatable stuff. They don't need someone to build them a car. They need someone to help them pick a car. And then they need that person to make that car run really, really well. And then they need that person on hand for when the car needs a tune up, or for when they need to switch cars.

The data-scientist-as-mechanic is not just the lightweight version of the data-scientist-as-engineer. It's a qualitatively different skill set. I do think the intersection of the three circles of the Conway diagram is bigger for the engineer than for the mechanic, but the mechanic needs much more coverage in a fourth skill set: the ability to integrate directly with the less-technical parts of the business. Sometimes people refer to this as "communication skills". I think that's like reducing "statistics skills" to "OLS regression skills" - it covers only a minute portion of the total skill set. I've written a little about this [before](http://housesofstones.github.io/2013/07/09/anthropology-and-data-science-need-each-other/). There are methods to discovering good question and understanding a business or a market, just as there are methods for clustering observations or forecasting values. These methods aren't irrelevant to a data-scientist-as-engineer, but they're much more essential, and play a much bigger role in the everyday life of, the data-scientist-as-mechanic.

If traditionally non-technical companies are going to really become data-driven, they're going to need more mechanics than engineers.

