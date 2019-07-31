<iframe id="vp" class="trackable-video" src="https://player.vimeo.com/video/VIDEO-ID"></iframe>
<iframe id="yt" class="trackable-video" src="https://www.youtube.com/embed/VIDEO-ID?enablejsapi=1"></iframe>
<video id="video" class="trackable-video" controls>
  <source src="video.mp4" type="video/mp4">
  Your browser does not support HTML5 video. 
</video>

<script src="jquery.js"></script>
<script src="dist/videolog.min.js"></script>

<script src="//player.vimeo.com/api/player.js"></script>

<script type="text/javascript">
	$('.trackable-video').videoLog();
</script>