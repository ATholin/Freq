function round(value, places) {
    var round_offset = 0.5 / Math.pow(10, places);
    var tot_str = "" + (value + round_offset);
    var point_idx = tot_str.indexOf(".");
    var result_str = "";
    var suffix_str = "";
    var nonzero_suffix = 0;
    var y = 0;
    var x = 0;
    var c = "";
    var exponent = "";
    while (x <= (point_idx + places)) {
        if (x == point_idx && y == 0) {
            y = 1;
        } else {
            c = tot_str.charAt(x);
            if (y == 0) {
                result_str += c
            } else {
                suffix_str += c;
                if (nonzero_suffix == 0 && c != "0" && c != ".") {
                    nonzero_suffix = 1;
                }
            }
            x++;
        }
    }
    c = tot_str.charAt(x);
    while (x < tot_str.length) {
        // document.write( tot_str );
        if (c == "e" || c == "E" || exponent != "") {
            exponent += c;
        }
        x++;
        c = tot_str.charAt(x);
    }

    if (nonzero_suffix == 1) {
        result_str += suffix_str;
    }
    return result_str + exponent;
}

function lognote(freq) {
    var oct = (Math.log(freq) - Math.log(440)) /
        Math.log(2) + 4.0;

    return oct;
}

function freq_to_note() {
    var freq = document.getElementById('freq').innerHTML;

    var lnote = lognote(freq);
    var oct = Math.floor(lnote);
    var cents = 1200 * (lnote - oct);

    var note_table = "A A#B C C#D D#E F F#G G#";

    var offset = 50.0;
    var x = 2;

    if (cents < 50) {
        note = "A ";
    } else if (cents >= 1150) {
        note = "A ";
        cents -= 1200;
        oct++;
    } else {
        for (j = 1; j <= 11; j++) {
            if (cents >= offset && cents < (offset + 100)) {
                note = note_table.charAt(x) + note_table.charAt(x + 1);
                cents -= (j * 100);
                break;
            }
            offset += 100;
            x += 2;
        }
    }
    document.getElementById('note').innerHTML = note + (oct + "");
    return;
}