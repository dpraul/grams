/*
 * All the filters
 */

function noFilter(image, percent) {
}

function invertFilter(image, percent) {
    var x, y, pixel;

    for (x = 0; x < image.width; x++) {
        for (y = 0; y < image.height; y++) {
            pixel = image.getPixel(x, y);
            image.setPixel(x, y, {
                r: parseInt(((255 - pixel.r)*percent) + (pixel.r*(1-percent))),
                g: parseInt(((255 - pixel.g)*percent) + (pixel.g*(1-percent))),
                b: parseInt(((255 - pixel.b)*percent) + (pixel.b*(1-percent)))
            });
        }
    }
}

function greyscaleFilter(image, percent) {
    var x, y, pixel;
    var grey = 0;
    var bw = 0;

    for (x = 0; x < image.width; x++) {
        for (y = 0; y < image.height; y++) {
            pixel = image.getPixel(x, y);
            grey = parseInt((pixel.r+pixel.g+pixel.g)/3.0);
            if (grey > 128){
                bw = 255;
            }
            else{
                bw = 0;
            }
            image.setPixel(x, y, {
                r: parseInt((bw*percent) + (grey*(1-percent))),
                g: parseInt((bw*percent) + (grey*(1-percent))),
                b: parseInt((bw*percent) + (grey*(1-percent)))
            });
        }
    }
}

function sepiaFilter(image, percent) {
    var x, y, pixel;

    for (x = 0; x < image.width; x++) {
        for (y = 0; y < image.height; y++) {
            pixel = image.getPixel(x, y);
            image.setPixel(x, y, {
                r: parseInt((pixel.r*0.393+pixel.g*0.769+pixel.b*0.189)*percent+pixel.r*(1-percent)),
                g: parseInt((pixel.r*0.349+pixel.g*0.686+pixel.b*0.189)*percent+pixel.g*(1-percent)),
                b: parseInt((pixel.r*0.272+pixel.g*0.534+pixel.b*0.131)*percent+pixel.b*(1-percent))
            });
        }
    }
}

function gridFilter(image, percent) {
    var x, y, pixel;
    var gridSize = parseInt(80*percent) + 3;

    for (x = 0; x < image.width; x++) {
        for (y = 0; y < image.height; y++) {
            pixel = image.getPixel(x, y);
            if (x%gridSize === 0 || y%gridSize === 0) {
                image.setPixel(x, y, {
                    r: 255,
                    g: 255,
                    b: 255
                });
            }
            else{
                // do nothing to the pixel
            }
        }
    }
}

function noiseFilter(image, percent) {
    var x, y, pixel;

    for (x = 0; x < image.width; x++) {
        for (y = 0; y < image.height; y++) {
            pixel = image.getPixel(x, y);
            if (Math.random() < percent) {
                image.setPixel(x, y, {
                    r: 255,
                    g: 255,
                    b: 255
                });
            }
            else{
                // do nothing to the pixel
            }
        }
    }
}

function motionBlurFilter(image, percent) {
    var x, y, pixel;
    var per = parseInt(15 * percent) + 6;
    if(per%2 === 0){
        per++;
    }

    var filter = [];

    for (var q = 0; q < per; q++){
        filter[q] = [];
        for (var r = 0; r < per; r++){
            if (q === r){
                 filter[q][r] = 1;
            }
            else{
                filter[q][r] = 0;
            }
        }
    }

    var filterLen = (filter.length - 1) / 2,
        counterR = 0, counterG = 0, counterB = 0,
        a, b, px, py,
        c = 1.0 / per;

    for (x = 0; x < image.width; x++) {
        for (y = 0; y < image.height; y++) {
            for (a = -filterLen; a < (filterLen+1); a++) {
                px = x + a;
                for (b = -filterLen; b < (filterLen+1); b++) {
                    py = y + b;
                    if (px >= 0 && px < image.width && py >= 0 && py < image.height) {
                        pixel = image.getPixel(px, py);
                    }
                    else if (px >= 0 && px < image.width) {
                        pixel = image.getPixel(px, y);
                    }
                    else if (py >= 0 && py < image.height) {
                        pixel = image.getPixel(x, py);
                    }
                    else {
                        pixel = image.getPixel(x, y);
                    }
                    counterR += filter[filterLen+a][filterLen+b] * pixel.r;
                    counterG += filter[filterLen+a][filterLen+b] * pixel.g;
                    counterB += filter[filterLen+a][filterLen+b] * pixel.b;
                }
            }
            image.setPixel(x, y, {
                r: parseInt(c * counterR),
                g: parseInt(c * counterG),
                b: parseInt(c * counterB)
            });
            counterR = 0;
            counterG = 0;
            counterB = 0;
        }
    }
}

function blurFilter(image, percent) {
    var x, y, pixel;
    var per = parseInt(15 * percent) + 1;
    if(per % 2 === 0){
        per++;
    }

    var filter = [];

    for (var q = 0; q < per; q++){
        filter[q] = [];
        for (var r = 0; r < per; r++){
             filter[q][r] = 1;
        }
    }

    var filterLen = (filter.length - 1) / 2,
        counterR = 0, counterG = 0, counterB = 0,
        a, b, px, py,
        c = 1.0 / (per * per);

    for (x = 0; x < image.width; x++) {
        for (y = 0; y < image.height; y++) {
            for(a = -filterLen; a < (filterLen+1); a++) {
                px = x + a;
                for (b = -filterLen; b < (filterLen+1); b++) {
                    py = y + b;
                    if (px >= 0 && px < image.width && py >= 0 && py < image.height) {
                        pixel = image.getPixel(px, py);
                    }
                    else if (px >= 0 && px < image.width) {
                        pixel = image.getPixel(px, y);
                    }
                    else if (py >= 0 && py < image.height) {
                        pixel = image.getPixel(x, py);
                    }
                    else {
                        pixel = image.getPixel(x, y);
                    }
                    counterR += filter[filterLen+a][filterLen+b] * pixel.r;
                    counterG += filter[filterLen+a][filterLen+b] * pixel.g;
                    counterB += filter[filterLen+a][filterLen+b] * pixel.b;
                }
            }
            image.setPixel(x, y, {
                r: parseInt(c * counterR),
                g: parseInt(c * counterG),
                b: parseInt(c * counterB)
            });
            counterR = 0;
            counterG = 0;
            counterB = 0;
        }
    }
}

function sharpFilter(image, percent) {
    var x, y, pixel;
    var per = parseInt(15*percent)+3;
    if (per%2 === 0){
        per++;
    }

    var filter = [];

    for (var q = 0; q < per; q++){
        filter[q] =  [];
        for (var r = 0; r < per; r++){
             filter[q][r] = 1;
        }
    }

    var filterLen = (filter.length - 1) / 2,
        counterR = 0, counterG = 0, counterB = 0,
        a, b, px, py,
        c = 1.0 / (per * per);

    for (x = 0; x < image.width; x++) {
        for (y = 0; y < image.height; y++) {
            for(a = -filterLen; a < (filterLen+1); a++) {
                px = x + a;
                for (b = -filterLen; b < (filterLen+1); b++) {
                    py = y + b;
                    if (px >= 0 && px < image.width && py >= 0 && py < image.height) {
                        pixel = image.getPixel(px, py);
                    }
                    else if (px >= 0 && px < image.width) {
                        pixel = image.getPixel(px, y);
                    }
                    else if (py >= 0 && py < image.height) {
                        pixel = image.getPixel(x, py);
                    }
                    else {
                        pixel = image.getPixel(x, y);
                    }
                    counterR += filter[filterLen+a][filterLen+b] * pixel.r;
                    counterG += filter[filterLen+a][filterLen+b] * pixel.g;
                    counterB += filter[filterLen+a][filterLen+b] * pixel.b;
                }
            }
            image.setPixel(x, y, {
                r: 2 * (pixel.r - parseInt(c * counterR)) + pixel.r,
                g: 2 * (pixel.g - parseInt(c * counterG)) + pixel.g,
                b: 2 * (pixel.b - parseInt(c * counterB)) + pixel.b
            });
            counterR = 0;
            counterG = 0;
            counterB = 0;
        }
    }
}

function wavesFilter(image, percent) {
    var x, y, pixel,
        per = parseInt(10 * percent) + 6;
    if (per % 2 === 0){
        per++;
    }

    var filter = [];

    for (var q = 0; q < per; q++){
        filter[q] = [];
        for (var r = 0; r < per; r++){
            if ((q+r) === (per-1)){
                 filter[q][r] = 0;
            }
            else if((q+r) > (per-1)){
                filter[q][r] = 1;
            }
            else{
                filter[q][r] = -1;
            }
        }
    }

    var filterLen = (filter.length - 1) / 2,
        counterR = 0, counterG = 0, counterB = 0,
        a, b, px, py,
        c = 1.0 / per;

    for (x = 0; x < image.width; x++) {
        for (y = 0; y < image.height; y++) {
            for (a = -filterLen; a < (filterLen+1); a++) {
                px = x + a;
                for (b = -filterLen; b < (filterLen+1); b++) {
                    py = y + b;
                    if (px >= 0 && px < image.width && py >= 0 && py < image.height) {
                        pixel = image.getPixel(px, py);
                    }
                    else if (px >= 0 && px < image.width) {
                        pixel = image.getPixel(px, y);
                    }
                    else if (py >= 0 && py < image.height) {
                        pixel = image.getPixel(x, py);
                    }
                    else {
                        pixel = image.getPixel(x, y);
                    }
                    counterR += filter[filterLen+a][filterLen+b] * pixel.r;
                    counterG += filter[filterLen+a][filterLen+b] * pixel.g;
                    counterB += filter[filterLen+a][filterLen+b] * pixel.b;
                }
            }
            image.setPixel(x, y, {
                r: parseInt(c * counterR) + 128,
                g: parseInt(c * counterG) + 128,
                b: parseInt(c * counterB) + 128
            });
            counterR = 0;
            counterG = 0;
            counterB = 0;
        }
    }
}

function contrastFilter(image, percent) {
    var i, x, y, pixel,
        size = (image.width * image.height),
        counterR = new Array(256).fill(0),
        counterG = new Array(256).fill(0),
        counterB = new Array(256).fill(0),
        mapR = [], mapG = [], mapB = [],
        sumR = 0.0,  sumG = 0.0, sumB = 0.0;

    for (x = 0; x < image.width; x++) {
        for (y = 0; y < image.height; y++) {
            pixel = image.getPixel(x, y);
            counterR[pixel.r] += 1;
            counterG[pixel.g] += 1;
            counterB[pixel.b] += 1;
        }
    }

    for(i = 0; i < 256; i++){
        counterR[i] /= size;
        counterG[i] /= size;
        counterB[i] /= size;
        sumR += counterR[i];
        sumG += counterG[i];
        sumB += counterB[i];
        mapR[i] = Math.round(255.0 * sumR);
        mapG[i] = Math.round(255.0 * sumG);
        mapB[i] = Math.round(255.0 * sumB);
    }


     for (x = 0; x < image.width; x++) {
        for (y = 0; y < image.height; y++) {
            pixel = image.getPixel(x, y);
            image.setPixel(x, y, {
                r: parseInt(mapR[pixel.r]*percent+pixel.r*(1-percent)),
                g: parseInt(mapG[pixel.g]*percent+pixel.g*(1-percent)),
                b: parseInt(mapB[pixel.b]*percent+pixel.b*(1-percent))
            });
        }
    }

}

var filters = [
        {
            name: "No Filter",
            filter: noFilter
        },
        {
            name: "Inverted",
            filter: invertFilter
        },
        {
            name: "Grid",
            filter: gridFilter
        },
        {
            name: "Blur",
            filter: blurFilter
        },
        {
            name: "Sharpen",
            filter: sharpFilter
        },
        {
            name: "Motion Blur",
            filter: motionBlurFilter
        },
        {
            name: "Waves",
            filter: wavesFilter
        },
        {
            name: "Noise",
            filter: noiseFilter
        },
        {
            name: "Contrast",
            filter: contrastFilter
        },
        {
            name: "Greyscale",
            filter: greyscaleFilter
        },
        {
            name: "Sepia",
            filter: sepiaFilter
        }
];
var selected_filter = 0;

/*
 * Page mess to apply filters
 */


function applyNextFilter() {
    selected_filter += 1;
    if (selected_filter === filters.length) {
        selected_filter = 0;
    }
    applyFilter();
}

function applyPrevFilter() {
    selected_filter -= 1;
    if (selected_filter < 0) {
        selected_filter = filters.length - 1;
    }
    applyFilter();
}

function applyFilter() {
    var f = filters[selected_filter],
        filter_percent = document.getElementById('filter_range').value / 100.0;
    document.getElementById('filter_name').innerHTML = f.name;
    window.image.reset();
    f.filter(window.image, filter_percent);
    window.image.render();
}


document.getElementById('filter_range').onchange = applyFilter;
document.getElementById('prev_filter').onclick = applyPrevFilter;
document.getElementById('next_filter').onclick = applyNextFilter;