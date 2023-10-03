import { data_BPM, data_SPO2 } from './firebase-config.js'; // Sesuaikan path dengan nama berkas Anda

let inputInteger3;
let inputInteger4;

document.addEventListener("DOMContentLoaded", function () {
    const measure = document.querySelector(".container");
    const hasilmeasure = document.querySelector(".container1");
    const hasilmeasure2 = document.querySelector(".container2");
    // tabel1
    const jk = document.querySelector(".j-k");
    const sh = document.querySelector(".sh");
    const mbpm = document.querySelector(".m-bpm");
    const bpmt = document.querySelector(".bpm-t");
    const spo_t = document.querySelector(".spo-t");
    const Nd = document.querySelector(".Nd");
    const Ea = document.querySelector(".Ea");

    // tabel1
    const jk1 = document.querySelector(".j-k1");
    const sh1 = document.querySelector(".sh1");
    const mbpm1 = document.querySelector(".m-bpm1");
    const bpmt1 = document.querySelector(".bpm-t1");
    const spo_t1 = document.querySelector(".spo-t1");
    const Nd1 = document.querySelector(".Nd1");
    const Ea1 = document.querySelector(".Ea1");

    //tidak lebih dari 150
    var input2 = document.getElementById("input2");
    //tidak diatas 36,2
    var input1 = document.getElementById("input1");
    var errorMessage1 = document.getElementById("error-message1");
    var errorMessage2 = document.getElementById("error-message2");
    var formGender = document.getElementById("formGender");
    var formAngina = document.getElementById("formAngina");
    var pilihanNyeri = document.getElementById("Nyeri");
    //max suhu
    input1.addEventListener("input", function () {
        var nilai = parseInt(input1.value, 10);

        if (nilai < 16.9 || nilai > 36.2) {
            input1.classList.add("input-error");
            errorMessage1.textContent = "Nilai harus antara 17 dan 36°C";
        } else {
            input1.classList.remove("input-error");
            errorMessage1.textContent = "";
        }
    });
    
    //max HR
    input2.addEventListener("input", function () {
        var nilai = parseInt(input2.value, 10);

        if (nilai < 60 || nilai > 220) {
            input2.classList.add("input-error");
            errorMessage2.textContent = "Nilai harus antara 60 dan 220";
        } else {
            input2.classList.remove("input-error");
            errorMessage2.textContent = "";
        }
    });
    //ketika tombol ditekan
    document.getElementById("tombol").addEventListener("click", function (){
        // mendefinisikan data dari input
        //jenis kelamin
        var selectedGender = document.querySelector('input[name="gender"]:checked');
        var genderValue = selectedGender ? selectedGender.value : "Belum dipilih";

        //Angina
        var selectedAngina = document.querySelector('input[name="Angina"]:checked');
        var AnginaValue = selectedAngina ? selectedAngina.value : "Belum dipilih";

        //Suhu dan Max HR
        var dataToSend1 = document.getElementById("input1").value;
        var dataToSend2 = document.getElementById("input2").value;
        
        // tombol kembali
        document.getElementById("kembali-ke-perhitungan").addEventListener("click", function (){
        measure.style.display = "grid";
        hasilmeasure.style.display = "none";
        hasilmeasure2.style.display = "none";
        });

        // tombol kembali
        document.getElementById("kembali-ke-perhitungan1").addEventListener("click", function (){
            measure.style.display = "grid";
            hasilmeasure.style.display = "none";
            hasilmeasure2.style.display = "none";
            });
        
        //tipe nyeri
        var selectedOption = Nyeri.options[Nyeri.selectedIndex];
        var selectedNyeri = selectedOption.value;

        //Cek apakah semua input telah dimasukkan
        if (input1.value !== "" && input2.value !== "" && genderValue !== "Belum dipilih" && AnginaValue !== "Belum dipilih" ) {
            //setelah aksi selesai, nilai menjadi kosong kembali
            input1.value = "";
            input2.value = "";

            //gender reset
            var radioGender = formGender.querySelectorAll('input[type="radio"]');
            for (var i = 0; i < radioGender.length; i++) {
                radioGender[i].checked = false;
            }

            //angina reset
            var radioAngina = formAngina.querySelectorAll('input[type="radio"]');
            for (var i = 0; i < radioAngina.length; i++) {
                radioAngina[i].checked = false;
            }

            //Nyeri reset
            pilihanNyeri.selectedIndex = 0;

            var inputInteger1 = parseInt(dataToSend1);
            var inputInteger2 = parseInt(dataToSend2);
            inputInteger3 = parseInt(data_BPM);
            inputInteger4 = parseInt(data_SPO2);
            var inputInteger5 = parseInt(genderValue);
            var inputInteger6 = parseInt(AnginaValue);
            var inputInteger7 = parseInt(selectedNyeri);

            var dataToSend = {
                data1: inputInteger1,
                data2: inputInteger2,
                data3: inputInteger3,
                data4: inputInteger4,
                data5: inputInteger5,
                data6: inputInteger6,
                data7: inputInteger7
            };
            // tampilan tabel
            if (inputInteger5 == 1){
                jk.innerHTML = "Laki-Laki";
            } else {
                jk.innerHTML = "Perempuan";
            }
            sh.innerHTML = inputInteger1 + "°C";
            mbpm.innerHTML = inputInteger2;
            bpmt.innerHTML = inputInteger3;
            spo_t.innerHTML = inputInteger4 + "%";
            Nd.innerHTML = inputInteger7;
            if (inputInteger6 == 1){
                Ea.innerHTML = "Ya";
            } else {
                Ea.innerHTML = "Tidak";
            }

            // tampilan tabel 2
            if (inputInteger5 == 1){
                jk1.innerHTML = "Laki-Laki";
            } else {
                jk1.innerHTML = "Perempuan";
            }
            sh1.innerHTML = inputInteger1 + "°C";
            mbpm1.innerHTML = inputInteger2;
            bpmt1.innerHTML = inputInteger3;
            spo_t1.innerHTML = inputInteger4 + "%";
            Nd1.innerHTML = inputInteger7;
            if (inputInteger6 == 1){
                Ea1.innerHTML = "Ya";
            } else {
                Ea1.innerHTML = "Tidak";
            }

            //memeriksa apakah konversi berhasil
            if (!isNaN(inputInteger1 && inputInteger2 && inputInteger3 && inputInteger4 && inputInteger5 && inputInteger6 && inputInteger7)) {
            // Melakukan permintaan HTTP POST ke server Python
            fetch('/api', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            })
            .then(response => response.json())
            .then(data => {
                // Menggunakan hasil yang diterima dari server Flask
                var hasilElement1 = document.getElementById("hasil");
                var hasilElement2 = document.getElementById("hasil2");
                if (data.hasil2) {
                    measure.style.display = "none";
                    hasilmeasure.style.display = "grid";
                    hasilmeasure2.style.display = "none";
                    hasilElement1.innerHTML = data.hasil1;
                } else {
                    measure.style.display = "none";
                    hasilmeasure2.style.display = "grid";
                    hasilmeasure.style.display = "none";
                    hasilElement2.innerHTML = data.hasil1;
                }
            })
            .catch(error => {
                var hasil1 = document.getElementById("hasil");
                hasil1.innerHTML = "Gagal melakukan permintaan" + error
            });
            } else {
                alert("masukkan data yang valid (bilangan bulat)");
            }
        } else {
            alert("Silakan isi semua input sebelum menekan tombol.");
        }
    });
});