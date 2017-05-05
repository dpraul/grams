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
                r: 255 - pixel.r,
                g: 255 - pixel.g,
                b: 255 - pixel.b
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