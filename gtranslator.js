var manifest = {
    settings: [
                {
                    name: "gtranslator",
                    type: "group",
                    label: "GTranslator",
                    settings: [
                        { name: "dlang", type: "member", set: ["en", "uk", "ru", "es", "fr", "de"], label: "Destination language", default: "uk" }
                      ]
                }
              ]
};

jetpack.future.import("storage.settings");
jetpack.future.import("selection");

var translate = function() {
    var text = jetpack.selection.text.replace(/^\s+|\s$/g, "");
    if (text.length > 0) {
        var url = "http://ajax.googleapis.com/ajax/services/language/translate";
        $.getJSON(	url,
                { type: "json", q: text, v: "1.0", langpair: "|" + jetpack.storage.settings.gtranslator.dlang },
                function(data) {
                    var resp = data.responseData.translatedText;
                    // it's also possible to add simple tooltip using title attribute
                    // jetpack.selection.html = "<span title='" + resp + "'>" + jetpack.selection.html + "</span>";
                    jetpack.notifications.show( {
                        title: text,
                        body: resp } );
                    }
                )
    }
}

jetpack.selection.onSelection(translate);

jetpack.statusBar.append( {
	html: '<font color="red">G</font><font color="blue">T</font>',
	width: 20,
	onReady: function(widget) {
		$(widget).click(translate)
    },
})
