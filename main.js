const textContrastValFG = document.querySelector('#text__contrast_test #foreground_color');
const bgConstrastValBG = document.querySelector('#text__contrast_test #background_color');

function luminance(r, g, b) {
    let a = [r, g, b].map(function(v) {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function contrast(rgb1, rgb2) {
    let lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
    let lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
    let brightest = Math.max(lum1, lum2);
    let darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
}

const updateTextContrastTest = (e) => {
    //contrast ratio text test
    let testWrapper = document.querySelector('.text__contrast_output');
    let testText = document.querySelector('.text__contrast_output h2');

    //converting values into array of RGB for calculation of luminance/contrast
    let currentBGVal = [parseInt(bgConstrastValBG.value.substr(1, 2), 16), parseInt(bgConstrastValBG.value.substr(3, 2), 16), parseInt(bgConstrastValBG.value.substr(5, 2), 16)];
    let currentTextVal = [parseInt(textContrastValFG.value.substr(1, 2), 16), parseInt(textContrastValFG.value.substr(3, 2), 16), parseInt(textContrastValFG.value.substr(5, 2), 16)];

    //setting colours of test text to current values
    testWrapper.style.backgroundColor = bgConstrastValBG.value;
    testText.style.color = textContrastValFG.value;

    //output the constrast ratio value
    document.querySelector('.result__text').innerHTML = contrast(currentBGVal, currentTextVal);

    if (contrast(currentBGVal, currentTextVal) > 4) {
        document.querySelector('.result__text').style.backgroundColor = "green";
    } else {
        document.querySelector('.result__text').style.backgroundColor = "red";
    }
}

bgConstrastValBG.addEventListener(('change'), updateTextContrastTest);
textContrastValFG.addEventListener(('change'), updateTextContrastTest);