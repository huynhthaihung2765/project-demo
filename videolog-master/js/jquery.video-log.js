(function ($) {
    $.fn.videoLog = function (options) {

        // Establish our settings
        var settings = $.extend({}, options);
        var youtubeVids = [];

        return this.each(function () {

            var $this = $(this);
            // Check if object is an iframe element,
            // then check if src attribute contains vimeo or youtube
            if ($this.is("iframe")) {
                if ($this.attr('src').indexOf("vimeo") > -1) {

                    // Hung Huynh
                    var name = $("#vimeo").text();
                    var d = new Date();

                    var month = d.getMonth()+1;
                    var day = d.getDate();

                    var currentDay = d.getFullYear() + '/' +
                        ((''+month).length<2 ? '0' : '') + month + '/' +
                        ((''+day).length<2 ? '0' : '') + day;
                    // Vimeo API Script
                    var id = this.id;
                    var player = new Vimeo.Player(id);

                    player.on('pause', function () {
                        player.getCurrentTime().then(function (seconds) {
                            console.log( currentDay + ': ' + name + ' paused at: ' + seconds);
                            playPauseAt(seconds);

                        }).catch(function (error) {
                            console.log("There was an error");
                        });
                    });

                    player.on('play', function () {
                        player.on('timeupdate', function () {
                            player.getCurrentTime().then(function (seconds) {
                                var playCheck = console.log( name + ' played at: ' + seconds );
                            }).catch(function (error) {
                                console.log("There was an error");
                            });
                        });
                    });

                    //END of Vimeo video
                }
                else if ($this.attr('src').indexOf("youtube") > -1) {

                    youtubeVids.push(this);
                    var videoScope = this;

                    function createYoutubeVideoById(id) {
                        var id = youtubeVids[i].id;
                        var ytplayer;
                        ytplayer = new YT.Player(id, {
                            events: {
                                'onReady': onPlayerReady,
                                'onStateChange': onPlayerStateChange
                            }
                        });

                        function onPlayerReady(event) {
                            document.getElementById(id);
                        }

                        function getStatus(playerStatus) {

                            if (playerStatus == -1) {
                                console.log("Not yet started"); // unstarted = gray
                            } else if (playerStatus == 0) {
                                console.log("Youtube video " + id + " has ended at " + ytplayer.getCurrentTime());
                            } else if (playerStatus == 1) {
                                var message = setInterval(function () {
                                    console.log("Youtube video " + id + " is playing at " + ytplayer.getCurrentTime());
                                }, 1000);
                            } else if (playerStatus == 2) {
                                console.log("Youtube video " + id + " has been paused at " + ytplayer.getCurrentTime());
                            } else if (playerStatus == 3) {
                                console.log("Youtube video " + id + " is buffering at " + ytplayer.getCurrentTime());
                            } else if (playerStatus == 5) {
                                console.log("Youtube video " + id + " was cued at " + ytplayer.getCurrentTime());
                            } else if (playerStatus !== 1) {
                                clearInterval(message);
                            }

                        }

                        function onPlayerStateChange(event) {
                            getStatus(event.data);
                        }
                    }

                    window.onYouTubeIframeAPIReady = function () {

                        for (i = 0; i < youtubeVids.length; i++) {
                            createYoutubeVideoById(videoScope.id)
                        }
                    }
                }
            }
            // Check if object is a video element 
            if ($this.is("video")) {

                var id = this.id;

                $this.on("play", function () {
                    $this.on("timeupdate", function () {
                        console.log('HTML5 Video ' + id + ' played at: ' + this.currentTime);
                    });
                });
                $this.on("pause", function () {
                    console.log('HTML5 Video ' + id + ' paused at: ' + this.currentTime);      
                });
                //END of HTML 5 Video
            }

            //Youtube-iFrame API script
            var tag = document.createElement('script');
            tag.id = 'iframe-api';
            tag.src = 'https://www.youtube.com/iframe_api';
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        });
    };

}(jQuery));
