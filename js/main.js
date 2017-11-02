(function() {
    var cURL = 'http://api.openweathermap.org/data/2.5/forecast?id=5809844&APPID=aa7eb28773adc3d0b474539123d26d68' +
        '&units=metric';

    var templateBlockTemp = '<span class=\"place-weather-block--cels-margin\">' +
        '{{temp}}' + '°</span>';
    var templateBlockName = '<span class=\"place-weather-block--cels-margin\">' +
        '{{name}}' + '</span>';

    var templateWeek = '<span class=\"week__temp\">{{temp}}</span>';


    var searchBtn = document.querySelector('.btn');
    var input = document.querySelector('.input');


    function App(URL) {
        this.weatherData = {};
        this.URL = cURL;
        this.citys = [
            {id: '4887398', name: 'Chicago', temp: 'cels'},
            {id: '5110302', name: 'Brooklyn', temp: 'cels'},
            {id: '5746545', name: 'Portland', temp: 'cels'},
            {id: '5392171', name: 'San-Jose', temp: 'cels'}
        ]
        this.fourDays = {};
    }

    App.prototype.render = function () {
        var listOfCitys = document.querySelectorAll('.place-weather-block');
        var listOfDays = document.querySelectorAll('.week__day-weather');
        var self = this;

        function renderBlocks(value, i, template, html) {
            //html.children[2].removeChild();
            let elem = document.createElement('div');
            elem.innerHTML = self.templater(template)(value);
            html.appendChild(elem);
        }

        for (var i = 0; i < 4; i++) {
            renderBlocks(this.weatherData[i], i, templateBlockName, listOfCitys[i]);
            renderBlocks(this.weatherData[i], i, templateBlockTemp, listOfCitys[i]);
            /*
            if(this.fourDays[i]) {
                renderBlocks(this.fourDays[i], i, templateWeek, listOfDays[i]);
            }*/
        }

    }

    App.prototype.templater = function (html) {
        return function (items) {
            for (var x in items) {
                var re = '{{\\s?' + x + '\\s?}}';
                html = html.replace(new RegExp(re, 'ig'), items[x]);
            }
            return html;
        };
    };

    App.prototype.set = function (value) {
        this.arr = value;
    }

    App.prototype.get = function (value) {
        return this;
    }

    App.prototype.objDefinePropSetGet = function () {
        Object.defineProperty(this, 'arr', {
            get: function () {
                if (!this.weatherData.weatherData) {
                    this.weatherData.weatherData = {};
                }
                this.render();
                return this.weatherData.weatherData;
            },
            set: function (value) {
                this.weatherData[0] = lt;

                for (var i = 0; i < 4; i++) {
                    var lt = {name: '', temp: ''};
                    lt.name = value.list[i].name;
                    lt.temp = Math.round(value.list[i].main.temp);

                    this.weatherData[i] = lt;
                }
                this.render();
            }
        });
    }

    App.prototype.load = function (callback) {
        var xhr = new XMLHttpRequest();

        xhr.onload = function (evt) {
            var loadedData = JSON.parse(evt.target.response);

            callback(loadedData);
        };
        xhr.open('GET', this.URL);
        xhr.send();

    }
    App.prototype.search = function () {
        this.setURL(input.value);
        this.load(this.render4Citys.bind(this));
        this.render()
    }
    App.prototype.init = function () {
        var ids = '';

        const length = this.citys.length;

        for (var i = 0; i < length; i++) {
            if (i === length - 1) {
                ids += this.citys[i].id;
            } else {
                ids += this.citys[i].id + ','
            }
        }
        var self = this;
        searchBtn.addEventListener('click', () => {
            this.search();
        });
        this.objDefinePropSetGet();

        this.setURL(ids);

        this.load(this.set.bind(this));

        // this.intervals();
    }
    App.prototype.render4Citys = function (value) {

    }
    App.prototype.setURL = function (value) {
        const toIds = 'group?id=';
        const toName = 'forecast?q=';
        const apiKey = '&APPID=aa7eb28773adc3d0b474539123d26d68';
        const metric = '&units=metric';

        if (typeof Number(value[0]) === 'number') {
            idOrName = toIds;
        } else {
            idOrName = toName;
        }
        this.URL = 'http://api.openweathermap.org/data/2.5/' +
            idOrName + value + apiKey + metric;
    }

    App.prototype.intervals = function () {
        try {
            setInterval(() => {
                //   console.log(this.URL);
                this.load(this.set.bind(this), this.URL);
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    }

    var a = new App();

    return a;
})().init();