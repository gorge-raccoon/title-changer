function populateForm(titleChanges) {
    var table = document.getElementById('options');
    function insertRow(configuration, index) {
        var row = table.insertRow(1);

        var urlPattern = document.createElement('input');
        urlPattern.value = configuration.urlPattern;
        urlPattern.readOnly = true;
        row.insertCell(-1).appendChild(urlPattern);

        var titleBefore = document.createElement('input');
        titleBefore.value = configuration.titleBefore;
        titleBefore.readOnly = true;
        row.insertCell(-1).appendChild(titleBefore);

        var titleAfter = document.createElement('input');
        titleAfter.value = configuration.titleAfter;
        titleAfter.readOnly = true;
        row.insertCell(-1).appendChild(titleAfter);

        var remove = document.createElement('button');
        remove.innerText = 'Remove';
        remove.onclick = function() {
            if (confirm('Are you sure?')) {
                titleChanges.splice(index, 1);
                saveTitleChanges(titleChanges);
            }
        };
        row.insertCell(-1).appendChild(remove);
    }
    titleChanges.forEach(insertRow);
}

function connectAddButton(titleChanges) {
    document.getElementById('add').onclick = function() {
        titleChanges.push({
            urlPattern: document.getElementById('urlPattern').value,
            titleBefore: document.getElementById('titleBefore').value,
            titleAfter: document.getElementById('titleAfter').value
        });
        saveTitleChanges(titleChanges);
    };
}

browser.storage.local.get('titleChanges').then(results => {
    if (results.hasOwnProperty('titleChanges')) {
        connectAddButton(results.titleChanges);
        populateForm(results.titleChanges);
    }
}, onError);

