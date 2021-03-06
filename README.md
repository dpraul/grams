# grams
The fakest of Instagrams, available in your browser at http://grams.dylanpraul.com/

# Adding filters
Filters are stored in `filters.js`. To add a new filter:

1. Add a function to `filters.js` with the new function. The example `invertFilter(image, percent)` is provided.
    - Filter functions take the parameter `image`, which is an instance of `SimpleImage` (see `image.js`)
    - Filter functions also take the parameter `percent`, which is the current position of the slider on page
    - Image size is available as `image.height` and `image.width`
    - `image.getPixel(x, y)` returns pixel objects with parameters `r`, `g`, `b`, and `a`
    - Pixels can be set using `image.setPixel(x, y, pixel)` where `pixel` is an object with parameters `r`, `g`, `b`, 
      and optionally `a`
2. Add a new item to the `filters` array, in the form of:
    ```javascript
        {
            name: "Filter Name",
            filter: filterFunction
        }
    ```
3. That's it. When you push changes, they will be available at http://grams.dylanpraul.com