$(document).ready(function () {
    $(".modalTarget").click(function () {
        var gid = $(this).parent().attr("id");
        if (gid != "") {
            if (gid == '1') {
                $(".modal-button").attr("onclick", "yaCounter43269239.reachGoal('ZA'); ga ('send', 'event', 'cat1', 'za');");
            } else if (gid == '2') {
                $(".modal-button").attr("onclick", "yaCounter43269239.reachGoal('PA'); ga ('send', 'event', 'cat1', 'pa');");
            } else if (gid == '3') {
                $(".modal-button").attr("onclick", "yaCounter43269239.reachGoal('VA'); ga ('send', 'event', 'cat1', 'va');");
            } else if (gid == '4') {
                $(".modal-button").attr("onclick", "yaCounter43269239.reachGoal('DA'); ga ('send', 'event', 'cat1', 'da');");
            } else if (gid == '5') {
                $(".modal-button").attr("onclick", "yaCounter43269239.reachGoal('NA'); ga ('send', 'event', 'cat1', 'na');");
            } else if (gid == '6') {
                $(".modal-button").attr("onclick", "yaCounter43269239.reachGoal('MA'); ga ('send', 'event', 'cat1', 'ma');");
            } else if (gid == '7') {
                $(".modal-button").attr("onclick", "yaCounter43269239.reachGoal('RA'); ga ('send', 'event', 'cat1', 'ra');");
            }
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
                            options += "<option value='" + this[nameVar]['$t'] + "'>" + this.gsx$name.$t + "</option>";
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