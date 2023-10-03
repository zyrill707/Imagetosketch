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


const canvas = document.getElementById('sketchCanvas');
const downloadButton = document.getElementById('downloadButton');
const ctx = canvas.getContext('2d');



function downloadCanvas() {
    const image = canvas.toDataURL('image/png'); 
    const link = document.createElement('a');
    link.href = image;
    link.download = 'canvas_image.png'; 
    link.click();
}


downloadButton.addEventListener('click', downloadCanvas);


document.addEventListener("DOMContentLoaded", function() {
    const imageInput = document.getElementById("photoInput");
    const convertButton = document.getElementById("converthd");
    const outputCanvas = document.getElementById("outputCanvas");
    const ctx = outputCanvas.getContext("2d");

    convertButton.addEventListener("click", function() {
        const file = imageInput.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.onload = function() {

                    const newWidth = 1920; 
                    const newHeight = 1080; 

                    outputCanvas.width = newWidth;
                    outputCanvas.height = newHeight;


                    ctx.drawImage(img, 0, 0, newWidth, newHeight);

                    outputCanvas.style.display = "block";
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
});
