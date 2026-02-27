/*
Copyright 2017 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

'use strict';

(function() {
  // Helper function to fetch a url
  function getUrl(url) {
    // Return a new promise.
    return new Promise(function(resolve, reject) {
      // Do the usual XHR stuff
      var req = new XMLHttpRequest();
      req.open('GET', url);

      req.onload = function() {
        // This is called even on 404 etc
        // so check the status
        if (req.status === 200) {
          // Resolve the promise with the response text
          resolve(req.response);
        } else {
          // Otherwise reject with the status text
          // which will hopefully be a meaningful error
          reject(Error(req.statusText));
        }
      };

      // Handle network errors
      req.onerror = function() {
        reject(Error('Network Error'));
      };

      // Make the request
      req.send();
    });
  }

  // Fetching 'our' feed - better be save than sorry, right? :)
  var newsEndPointUrl = 'data/feed.json';
  getUrl(newsEndPointUrl).then(function(response) {
    console.log('Success! We got the feed.', JSON.parse(response));

    // Parse the feed and build a safe list using DOM construction
    var feed = JSON.parse(response);
    var stories = feed.value.items;
    var ul = document.createElement('ul');
    for (var i = 0; i < stories.length; i++) {
      var title = stories[i].title;
      var link = stories[i].link;
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = link;          // href set as property, not injected HTML
      a.className = 'story';
      a.textContent = title;  // textContent escapes HTML
      li.appendChild(a);
      ul.appendChild(li);
    }

    var mainFeed = document.querySelector('.main-feed');

    // Now let's add our nice list to the page
    mainFeed.appendChild(ul);
  }, function(error) {
    console.error('Failed! No feed for you :(', error);
  });
})();
