$(document).ready(function () {
    $(".modalTarget").click(function () {
        var gid = $(this).parent().attr("id");
        if (gid != "") {
            // ID of the Google Spreadsheet
            var spreadsheetID = "1F9VFCkJ3x0BQ3_ZCRpVtWlQLMM3vGZjnmJpBxSPqDGU";

            // Make sure it is public or set to Anyone with link can view
            var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

            $.getJSON(url, function (data) {

                var options = "";

                var entry = data.feed.entry;

                if (entry.length > 0) {
                    var nameVar = "gsx$link" + gid;

                    $(".modal-button").attr("href", entry[0][nameVar]['$t']);

                    $(entry).each(function () {
                        if (this[nameVar]['$t'] != "") {
                            options += '<option value=' + this[nameVar]['$t'] + '>' + this.gsx$name.$t + '</option>';
                        }
                    });
                } else {
                    options = "Продукту немає в наявності";
                }

                $("#modalSelect").html(options);

                setTimeout(function () {
                    $("#modal-show").css("opacity", "1");
                    $("#modal-preloader").css("opacity", "0");
                },500);

                $("#modalSelect").chosen({disable_search: true, width: "100%", scroll_to_highlighted: false});
            });
        } else {
            alert("Error sending form. Try again later");
        }
    });

    $("#modalSelect").change(function () {
        var val = $(this).val();
        $(".modal-button").attr("href", val);
    });

    $('#myModal').on('hidden.bs.modal', function () {
        $("#modal-show").css("opacity", "0");
        $("#modal-preloader").css("opacity", "1");
        $("#modalSelect").html("");
        $("#modalSelect").chosen("destroy");
    });
});