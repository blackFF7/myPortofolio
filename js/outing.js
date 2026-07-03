
// ===== NOUVELLE ARCHITECTURE — rail vertical plein-hauteur =====
var navItems = [
    { id: 'accueil', idx: '00', label: 'Accueil', icon: 'bi-house-fill' },
    { id: 'profil', idx: '01', label: 'Profil', icon: 'bi-person-lines-fill' },
    { id: 'competences', idx: '02', label: 'Compétences', icon: 'bi-braces-asterisk' },
    { id: 'parcours', idx: '03', label: 'Parcours', icon: 'bi-clock-history' },
    { id: 'projet', idx: '04', label: 'Projet', icon: 'bi-folder2-open' },
    { id: 'contact', idx: '05', label: 'Contact', icon: 'bi-chat-dots-fill' }
];

var railList = document.getElementById('railList');
var railProgress = document.getElementById('railProgress');
var rcIdx = document.getElementById('rcIdx');
var rcLabel = document.getElementById('rcLabel');
var activeIndex = 0;
var isProgrammaticScroll = false;

navItems.forEach(function (item, i) {
    var li = document.createElement('li');
    li.className = 'rail-item' + (i === 0 ? ' active' : '');
    li.dataset.index = i;
    li.innerHTML = '<span class="rail-dot"></span><span class="rail-icon"><i class="bi ' + item.icon + '"></i></span><span class="rail-label">' + item.label + '</span>';
    railList.appendChild(li);
});

function setActive(i) {
    railList.querySelectorAll('.rail-item').forEach(function (el) {
        el.classList.toggle('active', +el.dataset.index === i);
    });
    rcIdx.textContent = navItems[i].idx;
    rcLabel.textContent = navItems[i].label;
    activeIndex = i;
}

function goToSection(i) {
    isProgrammaticScroll = true;
    setActive(i);
    var target = document.getElementById(navItems[i].id);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    setTimeout(function () { isProgrammaticScroll = false; }, 900);
}

railList.addEventListener('click', function (e) {
    var item = e.target.closest('.rail-item');
    if (!item) return;
    goToSection(+item.dataset.index);
});

document.querySelectorAll('[data-rail-link]').forEach(function (a) {
    a.addEventListener('click', function (e) {
        var href = a.getAttribute('href');
        if (!href || href.charAt(0) !== '#') return;
        var i = navItems.findIndex(function (n) { return n.id === href.slice(1); });
        if (i !== -1) {
            e.preventDefault();
            goToSection(i);
        }
    });
});

// scrollspy : met à jour l'item actif quand on scrolle manuellement
var sections = document.querySelectorAll('section[id]');
var spyObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting && !isProgrammaticScroll) {
            var i = navItems.findIndex(function (n) { return n.id === entry.target.id; });
            if (i !== -1 && i !== activeIndex) setActive(i);
        }
    });
}, { threshold: 0.4, rootMargin: '-10% 0px -40% 0px' });
sections.forEach(function (s) { spyObserver.observe(s); });

// barre de progression verticale liée au scroll global de la page
function updateProgress() {
    var scrollable = document.documentElement.scrollHeight - window.innerHeight;
    var pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    railProgress.style.height = Math.min(100, Math.max(0, pct)) + '%';
}
window.addEventListener('scroll', updateProgress);
updateProgress();

// reveal on scroll
var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(function (el) { revealObserver.observe(el); });

// effet de frappe dans le terminal du héros
var typedLine = document.getElementById('typedLine');
var cmd = "whoami --stack symfony";
var ti = 0;
function typeCmd() {
    if (ti <= cmd.length) {
        typedLine.textContent = cmd.slice(0, ti);
        ti++;
        setTimeout(typeCmd, 55);
    } else {
        setTimeout(function () {
            var out = document.createElement('div');
            out.className = 'term-out';
            var line1 = "Rabenahy Fandresena — D\u00e9veloppeur Symfony";
            var line2 = "Digitalisation RH \u00b7 Caisse d'\u00c9pargne Madagascar";
            var line3 = "Statut : disponible";
            out.innerHTML = '&gt; ' + line1 + '<br>&gt; ' + line2 + '<br>&gt; ' + line3;
            document.getElementById('termBody').appendChild(out);
        }, 400);
    }
}
setTimeout(typeCmd, 500);

// compteurs de statistiques
var counters = document.querySelectorAll('.stat-num');
var countObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            var el = entry.target;
            var target = parseInt(el.dataset.count, 10);
            var cur = 0;
            var step = Math.max(1, Math.ceil(target / 30));
            var t = setInterval(function () {
                cur += step;
                if (cur >= target) { cur = target; clearInterval(t); }
                el.textContent = cur;
            }, 45);
            countObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });
counters.forEach(function (c) { countObserver.observe(c); });

// timeline : tap pour ouvrir sur écrans tactiles
document.querySelectorAll('.tl-item').forEach(function (item) {
    item.addEventListener('click', function () {
        if (window.matchMedia('(hover: none)').matches) {
            item.classList.toggle('open');
        }
    });
});

// formulaire de contact (démo)
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var toast = document.getElementById('toastX');
    toast.classList.add('show');
    this.reset();
    setTimeout(function () { toast.classList.remove('show'); }, 3200);
});