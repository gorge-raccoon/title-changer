function onError(error) {
    alert(`Error: ${error}`);
}

function saveTitleChanges(titleChanges) {
    if (!titleChanges) {
        titleChanges = [
            {
                urlPattern: 'https:\/\/en\\.wikipedia\\.org.*',
                titleBefore: '(.*?) - Wikipedia',
                titleAfter: '$1'
            }
        ];
    }
    console.log('Save', titleChanges);
    browser.storage.local
        .set({ titleChanges: titleChanges })
        .then(applyTitleChanges(titleChanges), alert);
}

function applyTitleChanges(titleChanges) {
    function changeTitle(configuration) {
        var urlPattern = RegExp(configuration.urlPattern);
        var titleBefore = RegExp(configuration.titleBefore);
        var titleAfter = configuration.titleAfter;

        if (urlPattern.test(document.URL)) {
            var title = document.title.replace(titleBefore, titleAfter);
            document.title = title;
        }
    }
    console.log('Apply', titleChanges);
    titleChanges.forEach(changeTitle);
}

browser.storage.local.get('titleChanges').then(results => {
    if (results.hasOwnProperty('titleChanges')) {
        applyTitleChanges(results.titleChanges);
    } else {
        saveTitleChanges();
    }
}, onError);

