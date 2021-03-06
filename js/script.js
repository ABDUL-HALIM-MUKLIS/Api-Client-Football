const ApiKey = "b9c2502a91124146b89478b7c2509b71";
const baseUrl = "https://api.football-data.org/v2/";
const leagueId = "2021";
const baseEndPoin = `${baseUrl}competitions/${leagueId}`;
const teamEndPoin = `${baseUrl}competitions/${leagueId}/teams`;
const standingEndPoin = `${baseUrl}competitions/${leagueId}/standings`;
const matchEndPoin = `${baseUrl}competitions/${leagueId}/matches`;

const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");
const fetchHeader = {
    headers: {
        'X-Auth-Token': ApiKey
    }
};

function getListTeams() {
    title.innerHTML = "Daftar Tim Liga Primer Inggris"
    fetch(teamEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.teams);
            let teams = "";
            resJson.teams.forEach(team => {
                teams += `
                <li class="collection-item avatar" >
                    <img src="${team.crestUrl}" alt="" class="circle">
                    <span class="title">${team.name}</span>
                    <p>Berdiri: ${team.founded} <br>
                       Markas: ${team.venue}
                    </p>
                    <a href="#${team.id}" data-id="${team.id}" class="secondary-content" ><i data-id="${team.id}" class="material-icons" >info</i></a>
                </li>
                `
            });
            contents.innerHTML = '<ul class="collection">' + teams + '</ul>';
            const detil = document.querySelectorAll('.secondary-content');
            detil.forEach(btn => { 
                btn.onclick = (e) => {
                    loadPage(e.target.dataset.id);
                    // showTeamInfo(e.target.dataset.id);
                    // console.log(e.target.dataset.id);
                }
            })
        }).catch(err => {
            console.error(err);
        })
}

function showTeamInfo(id) {

    

    let url = baseUrl + "teams/"+ id;
    
    fetch(url, fetchHeader)
        .then(response => response.json())
        .then(data => {
            title.innerHTML = "Tim " + data.name + " ("+ data.tla +")"
            //  Kompetisi yang di ikuti
            let kompetisi = "";
            let x = 1;
            data.activeCompetitions.forEach(team => {
                kompetisi += `
                <tr>
                    <td style="padding-left:20px;">${x}.</td>
                    <td>${team.name}</td>
                    <td>${team.plan}</td>
                </tr>
                `;
                x++;

            });
            //--------------------------------
            // pemain
            let pemain = "";
            let i = 1;
            data.squad.forEach(team => {
                pemain += `
                <tr>
                    <td style="padding-left:20px;">${i}.</td>
                    <td>${team.name}</td>
                    <td>${team.position}</td>
                    <td>${team.dateOfBirth}</td>
                    <td>${team.countryOfBirth}</td>
                    <td>${team.nationality}</td>
                    <td>${team.shirtNumber}</td>
                    <td>${team.role}</td>
                </tr>
                `;
                i++;

            });
            //------------------------------
            //content utama
            contents.innerHTML = `
                <div class="row">
                    <div class="col s6">
                        <img src="${data.crestUrl}" alt="${data.area.name}" width="300px"></td>
                    </div>
                    <div class="col s1">
                        <p>Daerah   :</p>
                        <p>Alamat   :</p>
                        <p>Nomer    :</p>
                        <p>Situs    :</p>
                        <p>Email    :</p>
                        <p>Lokasi   :</p>
                    </div>
                    <div class="col s5">
                        <p>${data.area.name}</p>
                        <p>${data.address}</p>
                        <p>${data.phone}</p>
                        <p>${data.website}</p>
                        <p>${data.email}</p>
                        <p>${data.venue}</p>
                    </div>
                </div>

                <h5>KOMPETISI</h5>
                <div class="card">
                    <table class="striped responsive-table">
                        <thead>
                            <th>No</th>
                            <th>Name</th>
                            <th>Rencana</th>
                        </thead>
                        <tbody>
                            ${kompetisi}
                        </tbody>
                    </table>
                </div>

                <h5>PEMAIN</h5>
                <div class="card ">
                    <table class="striped responsive-table">
                    <thead>
                        <th>No</th>
                        <th>Name</th>
                        <th>Posisi</th>
                        <th>Tanggal Lahir</th>
                        <th>Asal Negara</th>
                        <th>Kebangsaan</th>
                        <th>Nomer punggung</th>
                        <th>Sebagai</th>
                    </thead>
                    <tbody>
                            ${pemain}
                    </tbody>
                    </table>

                </div>
            `;
            //------------------------------
        }).catch(err => {
            // console.error(err);
            console.log(err);
        })
        
}

function getListStandings() {
    title.innerHTML = "Klasemen Sementara Liga Primer Inggris";
    fetch(standingEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.standings[0]);
            let teams = "";
            let i = 1;
            resJson.standings[0].table.forEach(team => {
                teams += `
                <tr>
                    <td style="padding-left:20px;">${i}.</td>
                    <td><img src="${team.team.crestUrl}" alt="${team.team.name}" width="30px"></td>
                    <td>${team.team.name}</td>
                    <td>${team.playedGames}</td>
                    <td>${team.won}</td>
                    <td>${team.draw}</td>
                    <td>${team.lost}</td>
                    <td>${team.points}</td>
                </tr>
                `;
                i++;

            });
            contents.innerHTML = `
                <div class="card">
                    <table class="stripped responsive-table">
                        <thead>
                            <th></th>
                            <th></th>
                            <th>Nama Tim</th>
                            <th>PG</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>P</th>
                        </thead>
                        <tbody>
                            ${teams}
                        </tbody>
                    </table>
                </div>
            `;
        }).catch(err => {
            console.error(err);
        })
}

function getListMatches() {
    title.innerHTML = "Jadwal Pertandingan Liga Primer Inggris";
    fetch(matchEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.matches);
            let matchs = "";
            let i = 1;
            resJson.matches.forEach(match => {
                let d = new Date(match.utcDate).toLocaleDateString("id");
                let scoreHomeTeam = (match.score.fullTime.homeTeam == null ? 0 : match.score.fullTime.homeTeam);
                let scoreAwayTeam = (match.score.fullTime.awayTeam == null ? 0 : match.score.fullTime.awayTeam);
                matchs += `
                <tr>
                    <td style="padding-left:20px;">${i}.</td>
                    <td>${match.homeTeam.name} vs ${match.awayTeam.name}</td>
                    <td>${d}</td>
                    <td>${scoreHomeTeam}:${scoreAwayTeam}</td>
                </tr>
                `;
                i++;

            });
            contents.innerHTML = `
                <div class="card">
                    <table class="stripped responsive-table">
                        <thead>
                            <th></th>
                            <th>Peserta</th>
                            <th>Tanggal</th>
                            <th>Skor Akhir</th>
                        </thead>
                        <tbody>
                            ${matchs}
                        </tbody>
                    </table>
                </div>
            `;
        }).catch(err => {
            console.error(err);
        })
}

function loadPage(page) {
    switch (page) {
        case "teams":
            getListTeams();
            break;
        case "standings":
            getListStandings();
            break;
        case "matches":
            getListMatches();
            break;
        case page:
            showTeamInfo(page);
            break;

    }


}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "teams";
    loadPage(page);
});

