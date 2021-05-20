---
title: 'Youtube DL - CLI tool to download videos'
date: '2020-03-14T11:42:18+00:00'
author: 'André Kovac'
description: 'Some usage examples of how to run the youtube-dl command'
category: 'shell'
tags: ['bash']
---

## Commands

**Important**: Always put video link in quotes!

### Manual

1. Get list of all formats

	```bash
	youtube-dl -F 'http://www.youtube.com/watch?v=P9pzm5b6FFY'
	```

	You'll get a list like this

	```
	format code  extension  resolution note
	249          webm       audio only tiny   54k , webm_dash container, opus @ 54k (48000Hz), 1.57MiB
	250          webm       audio only tiny   71k , webm_dash container, opus @ 71k (48000Hz), 2.08MiB
	140          m4a        audio only tiny  129k , m4a_dash container, mp4a.40.2@129k (44100Hz), 3.74MiB
	251          webm       audio only tiny  141k , webm_dash container, opus @141k (48000Hz), 4.10MiB
	160          mp4        144x144    144p    9k , mp4_dash container, avc1.4d400b@   9k, 25fps, video only, 279.17KiB
	394          mp4        144x144    144p   17k , mp4_dash container, av01.0.00M.08@  17k, 25fps, video only, 529.11KiB
	278          webm       144x144    144p   21k , webm_dash container, vp9@  21k, 25fps, video only, 638.02KiB
	133          mp4        240x240    240p   16k , mp4_dash container, avc1.4d400c@  16k, 25fps, video only, 481.49KiB
	242          webm       240x240    240p   44k , webm_dash container, vp9@  44k, 25fps, video only, 1.27MiB
	395          mp4        240x240    240p   45k , mp4_dash container, av01.0.00M.08@  45k, 25fps, video only, 1.32MiB
	134          mp4        360x360    360p   23k , mp4_dash container, avc1.4d4015@  23k, 25fps, video only, 702.77KiB
	396          mp4        360x360    360p   72k , mp4_dash container, av01.0.00M.08@  72k, 25fps, video only, 2.10MiB
	243          webm       360x360    360p   90k , webm_dash container, vp9@  90k, 25fps, video only, 2.61MiB
	135          mp4        480x480    480p   44k , mp4_dash container, avc1.4d401e@  44k, 25fps, video only, 1.29MiB
	397          mp4        480x480    480p  125k , mp4_dash container, av01.0.01M.08@ 125k, 25fps, video only, 3.61MiB
	244          webm       480x480    480p  157k , webm_dash container, vp9@ 157k, 25fps, video only, 4.54MiB
	136          mp4        720x720    720p   87k , mp4_dash container, avc1.4d401f@  87k, 25fps, video only, 2.53MiB
	398          mp4        720x720    720p  254k , mp4_dash container, av01.0.04M.08@ 254k, 25fps, video only, 7.34MiB
	247          webm       720x720    720p  313k , webm_dash container, vp9@ 313k, 25fps, video only, 9.05MiB
	137          mp4        1080x1080  1080p  299k , mp4_dash container, avc1.640020@ 299k, 25fps, video only, 8.65MiB
	399          mp4        1080x1080  1080p  436k , mp4_dash container, av01.0.08M.08@ 436k, 25fps, video only, 12.60MiB
	248          webm       1080x1080  1080p  534k , webm_dash container, vp9@ 534k, 25fps, video only, 15.42MiB
	18           mp4        360x360    360p  159k , avc1.42001E, 25fps, mp4a.40.2 (44100Hz), 4.60MiB (best)
	```

2. Pick a format number (here `137`) and

	```bash
	youtube-dl -f 137 'http://www.youtube.com/watch?v=P9pzm5b6FFY' --merge-output-format mp4
	```

### Simple - pick `best` option

Best audio + video compromise (usually won't be best full HD video format):

```bash
youtube-dl -f best 'http://www.youtube.com/watch?v=P9pzm5b6FFY'
```

### If best video is important to you

Download video only and audio only separately or take audio from the `best` option if you know how to split video and audio with an editing tool.

Try best audio + video (didn't work for me yet..)

```bash
youtube-dl -f 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/bestvideo+bestaudio' --merge-output-format mp4 'http://www.youtube.com/watch?v=P9pzm5b6FFY'
```

## Error fixes

In case you get `ERROR: unable to download video data: HTTP Error 403: Forbidden` try the following:

1. Update `youtube-dl`, e.g. with `brew upgrade youtube-dl`.

2. Clear cache

	```bash
	youtube-dl --rm-cache-dir
	```

	Solution found [here](https://www.ostechnix.com/fix-unable-to-download-video-data-http-error-403-forbidden-error/).

Did you forget to put your video link in quotes??