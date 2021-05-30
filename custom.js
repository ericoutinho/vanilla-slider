const slider = document.querySelector(".slider");
        const wraper = document.querySelector(".slider-wraper");
        const dots = document.querySelector(".slider-dots");

        let width = slider.offsetWidth;
        let moving = false;
        let over = false;
        let timer;
        let active = 0;

        slider.addEventListener("mouseenter", function () {
            clearInterval(timer);
        }, true);

        slider.addEventListener("mouseout", function () {
            clearInterval(timer);
            playAuto();
        }, true);

        // cria a navegação por pontos
        let slides = document.querySelectorAll('.slider-item');
        slides.forEach(function (element, index) {
            // cria o atributo data-index nos slides
            element.setAttribute("data-index", index);
            // cria os pontos de navegação
            let dot = document.createElement("div");
            dot.classList.add("slider-dots__item");
            dot.setAttribute("data-index", index);
            dots.append(dot);
        });

        // Adiciona comportamento aos pontos
        let dotlinks = dots.querySelectorAll(".slider-dots__item");
        dotlinks.forEach(function (element, index) {
            element.addEventListener("click", function (event) {
                let to = wraper.querySelector(".slider-item[data-index='" + element.dataset.index +
                    "']").offsetLeft;
                active = element.dataset.index;
                dotlinks.forEach((e) => {
                    e.classList.remove("active")
                });
                element.classList.add("active");
                wraper.scroll({
                    left: to,
                    behavior: "smooth"
                });
            })
        })

        function playNext() {
            if (!moving) {
                moving = true;
                var slides = document.querySelectorAll('.slider-item');
                wraper.scroll({
                    left: width,
                    behavior: "smooth"
                });
                setTimeout(() => {
                    active = slides[1].getAttribute("data-index");
                    document.querySelectorAll(".slider-dots__item").forEach((element) => {
                        element.classList.remove("active")
                    });
                    document.querySelector(`.slider-dots__item[data-index='${active}']`).classList.add(
                        "active");
                    wraper.append(slides[0]);
                }, 500);
                moving = false;
            }
        }

        function playPrev() {
            if (!moving) {
                moving = true;
                var slides = document.querySelectorAll('.slider-item');
                wraper.scroll({
                    left: width * -1,
                    behavior: "smooth"
                });
                setTimeout(() => {
                    slides = document.querySelectorAll('.slider-item');
                    active = slides[0].getAttribute("data-index");
                    document.querySelectorAll(".slider-dots__item").forEach((element) => {
                        element.classList.remove("active")
                    });
                    document.querySelector(`.slider-dots__item[data-index='${active}']`).classList.add(
                    "active");
                    wraper.prepend(slides[slides.length - 1]);
                }, 500);
                moving = false;
            }
        }

        function playAuto() {
            timer = setInterval(function () {
                playNext();
            }, 5000);
        }

        playAuto();