$(function() {
  
  var postURLs,
      isFetchingPosts = false,
      shouldFetchPosts = true,
      postsToLoad = $(".post-list").children().length,
      loadNewPostsThreshold = 3000;
  
  // Load the JSON file containing all URLs
  $.getJSON('/all-posts.json', function(data) {
    postURLs = data["posts"];
    
  // If there aren't any more posts available to load than already visible, disable fetching
    if (postURLs.length <= postsToLoad)
      disableFetching();
  });
	
  // If there's no spinner, it's not a page where posts should be fetched
  if ($(".infinite-spinner").length < 1)
    shouldFetchPosts = false;
	
  // Are we close to the end of the page? If we are, load more posts
  $(window).scroll(function(e){
    if (!shouldFetchPosts || isFetchingPosts) return;
    
    var windowHeight = $(window).height(),
        windowScrollPosition = $(window).scrollTop(),
        bottomScrollPosition = windowHeight + windowScrollPosition,
        documentHeight = $(document).height();
    
    // If we've scrolled past the loadNewPostsThreshold, fetch posts
    if ((documentHeight - loadNewPostsThreshold) < bottomScrollPosition) {
      fetchPosts();
    }
  });
  
  // Fetch a chunk of posts
  function fetchPosts() {
    // Exit if postURLs haven't been loaded
    if (!postURLs) return;
    
    isFetchingPosts = true;
    
    // Load as many posts as there were present on the page when it loaded
    // After successfully loading a post, load the next one
    var loadedPosts = 0,
        postCount = $(".post-list").children().length,
        callback = function() {
          loadedPosts++;
          var postIndex = postCount + loadedPosts;
          
          if (postIndex > postURLs.length-1) {
            disableFetching();
            return;
          }
          
          if (loadedPosts < postsToLoad) {
            fetchPostWithIndex(postIndex, callback);
          } else {
            isFetchingPosts = false;
          }
        };
		
    fetchPostWithIndex(postCount + loadedPosts, callback);
  }

  function get_href(get_list) {
    for(var i=0; i<get_list.length; i++) {
        var x = get_list[i];
        if(x.className=='post-url'){
            return x.href;
        }
     }
  }

  function fetchPostWithIndex(index, callback) {
    var postURL = postURLs[index];
		
    $.get(postURL, function(data) {
    url = get_href($(data));
    title = $(data).find('.post-title').html();
    meta = $(data).find('.post-meta').html();
 
    list_elem = document.createElement("li");
    text_node = document.createTextNode('\u00A0\u00A0\u00A0')
    
    link_elem = document.createElement("a");
    link_elem.setAttribute("class", "post-link");
    link_elem.setAttribute("href", url );
    link_elem.innerHTML = title

    span_elem = document.createElement("span");
    span_elem.setAttribute("class", "post-meta");
    span_elem.innerHTML = meta

    list_elem.appendChild(link_elem)
    list_elem.appendChild(text_node)
    list_elem.appendChild(span_elem)

    $(".post-list").append(list_elem)
    callback();

    });


  }
  
  function disableFetching() {
    shouldFetchPosts = false;
    isFetchingPosts = false;
    $(".infinite-spinner").fadeOut();
  }
	
});
