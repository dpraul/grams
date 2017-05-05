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

function gridFilter(image, percent) {
    var x, y, pixel;
    var gridSize = parseInt(80*percent) + 3;

    for (x = 0; x < image.width; x++) {
        for (y = 0; y < image.height; y++) {
            pixel = image.getPixel(x, y);
            if (x%gridSize == 0 || y%gridSize == 0) {
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

function sharpFilter(image, percent) {
    var x, y, pixel;
    var filter = [
        [1,1,1],
        [1,1,1],
        [1,1,1]
    ];
    var filterSize = filter.length;
    var filterLen = (filterSize - 1) / 2;
    var counterR = 0;
    var counterG = 0;
    var counterB = 0;

    //for (var l = 0; l < parseInt(100*percent); l++){
        for (x = filterLen; x < (image.width-filterLen); x++) {
            for (y = filterLen; y < (image.height-filterLen); y++) {
                for(var a = -filterLen; a < (filterLen+1); a++) 
                for (var b = -filterLen; b < (filterLen+2); b++) {
                    pixel = image.getPixel(x+a, y+b);
                    counterR = counterR + pixel.r;
                    counterG = counterG + pixel.g;
                    counterB = counterB + pixel.b;
                }
                image.setPixel(x, y, {
                    r: parseInt((1.0/9.0)*counterR),
                    g: parseInt((1.0/9.0)*counterG),
                    b: parseInt((1.0/9.0)*counterB)
                });
            }
        }
    //}
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
            name: "Sharpen",
            filter: sharpFilter
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