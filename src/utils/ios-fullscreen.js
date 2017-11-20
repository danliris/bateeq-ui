export class IosFullScreen {

    fullScreen(standalone, report) {
        if (standalone == undefined) {
            if (report) {
                report.fullscreen();
            }
        }
        else {
            document.myStyle = 'width: 100%; height: 100%; position: absolute; top: 0; left: 0; z-index: 99999999;';
            document.getElementsByClassName("navbar-header")[0].innerHTML = document.getElementsByClassName("navbar-header")[0].innerHTML + "<button id='FullScreen' class='btn btn-primary navbar-brand' style='margin-left: 5px'>Back</button>";
            document.getElementById("FullScreen").parent.onclick =
                () => {
                    document.myStyle = '';
                    document.getElementById('FullScreen').remove();
                };
        }
    }
}