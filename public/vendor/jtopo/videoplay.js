function videoPlay() {
    var id = window.requestAnimationFrame(videoPlay);
    now = Date.now();
    delta = now - then;
    if (delta > interval) {
        // 这里不能简单then=now，否则还会出现上边简单做法的细微时间差问题。例如fps=10，每帧100ms，而现在每16ms（60fps）执行一次draw。16*7=112>100，需要7次才实际绘制一次。这个情况下，实际10帧需要112*10=1120ms>1000ms才绘制完成。
        then = now - (delta % interval);
        video.update();
        //video.render();
        if (video.tickCount > 100) {
            video.video.ended = true;
            window.cancelAnimationFrame(id);
            video.context.clearRect(0, 0, video.width, video.height);
            loadData();
        }
        else {
            video.render();
        }
    }

}

function spriteVideo(options) {
    var that = {};
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.video = options.video;
    that.tickCount = 0;//视频重复播放次数
    that.alpha = 1.0;//透明度
    that.update = function () {
        that.alpha = that.alpha - 0.01;
        that.tickCount += 1;
    }
    that.render = function () {
        // Clear the canvas
        that.context.clearRect(0, 0, that.width, that.height);
        that.context.drawImage(
            that.video,
            0,
            0,
            that.width,
            that.height
            )
        //that.context.globalAlpha = that.alpha;
    };

    return that;
}