function convertToSketch() {
    const canvas = document.getElementById("sketchCanvas");
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = URL.createObjectURL(document.getElementById("imageInput").files[0]);

    image.onload = function () {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < imageData.data.length; i += 4) {
            const avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
            imageData.data[i] = avg;
            imageData.data[i + 1] = avg;
            imageData.data[i + 2] = avg;
        }

        ctx.putImageData(imageData, 0, 0);
    };
}

document.getElementById("convertButton").addEventListener("click", convertToSketch);