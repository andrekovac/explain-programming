---
title: 'Youtube DL - CLI tool to download videos'
date: '2020-03-14T11:42:18+00:00'
author: 'André Kovac'
description: 'Some usage examples of how to run the youtube-dl command'
category: 'shell'
tags: ['bash']
---

## youtube-dl

1. Get list of all formats

	```bash
	youtube-dl -F 'http://www.youtube.com/watch?v=P9pzm5b6FFY'
	```

2. Pick a format number (here `137`) and

	```bash
	youtube-dl -f 137 'http://www.youtube.com/watch?v=P9pzm5b6FFY' --merge-output-format mp4
	```

Best audio + video compromise (usually won't be best full HD video format):

```bash
youtube-dl -f best 'http://www.youtube.com/watch?v=P9pzm5b6FFY'
```

Try best audio + video (didn't work for me yet..)

```bash
youtube-dl -f 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/bestvideo+bestaudio' --merge-output-format mp4 'http://www.youtube.com/watch?v=P9pzm5b6FFY'
```