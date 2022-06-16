---
title: "Updating Past Projects 2"
date: "2018-01-27"
---

So, I decided to not combine all edits into one post-- it would have become unnecessarily long. Instead, adding numbers at the end, but using the same title to keep them somewhat grouped.

On the previous post I covered my update on my quote machine, this one will cover the wiki viewer.

## Wiki Viewer

Issues:

- The way to execute a search.

Initially, I had it setup by pressing the `enter` key, but the few people I had test it told me they looked for a button first, when mobile.

- The display of search results on mobile.

The keyboard, when mobile, hid the search results.

Updated version:

- I added a `search` button, but kept the `enter` key feature.

- I moved the `random` button to line up with the `search` button.

- The spacing between the input search bar and results area was minimized.

- Wrapped API call for `enter` and `search` button into a function, depending on which option is used to execute search. In other words, so the code isn't repeated.

updated snippet:

```
   $("#go").on("click", function() {
      // console.log("you clicked button");
      wikiPress();
    });

    $("#input").keydown(function(event) {
      if(event.which == 13 || event.keyCode == 13) {
        // console.log("you clicked enter")
        wikiPress();
      } // end of if statement
    }); // end of keypress

    function wikiPress() {
      var wikiInput = $("#input");
      var wikiSearch = wikiInput.val();
      $("#input").val(""); // clears search wiki box

        $.ajax({
          url: "https://en.wikipedia.org/w/api.php?action=query&list=search&formatversion=latest&srsearch=" + wikiSearch + "&srlimit=max&srprop=snippet&format=json",
          dataType: "jsonp",
          success:
            function(data) {
              var search = data.query.search;
              // console.log(search);
              var wikiList = "";
              // https://en.wikipedia.org/wiki/[title here]
              search.forEach(function(el) {
                // console.log(el);
                wikiList += "<div class='wikiEntry'>" + "<strong>" + "<a href='https://en.wikipedia.org/wiki/" + el.title + "'>" + el.title + "</a>" + "</strong>" + "<br />" + el.snippet + " [...]" + "<br />" + "</div>" + "<br />";
              }); // end search.forEach
              $(".wiki").html(wikiList);
            } //
        }); // end of AJAX
    } // end of wikiPress()

```

[check out 2.0 here](http://wikiviewer-jo.herokuapp.com/)
