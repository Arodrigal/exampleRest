"use strict";
var Video = (function () {
    function Video(id, titulo, description, status, image, videoPath, createdAt, updatedAt, user) {
        this.id = id;
        this.titulo = titulo;
        this.description = description;
        this.status = status;
        this.image = image;
        this.videoPath = videoPath;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.user = user;
    }
    return Video;
}());
exports.Video = Video;
//# sourceMappingURL=video.js.map