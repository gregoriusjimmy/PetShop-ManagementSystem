import React from "react";

import LaporanRugiLaba from "./laporan-rugi-laba.component";
import Neraca from "./neraca.component";
import PerubahanModal from "./perubahan-modal.component";

const LaporanContainer = ({ dataLaporan }) => {
  console.log(dataLaporan, "container");
  return (
    <div>
      <LaporanRugiLaba data={dataLaporan.laporanRugiLaba} />
      <Neraca data={dataLaporan.neraca} />
      <PerubahanModal data={dataLaporan.perubahanModal} />
    </div>
  );
};

export default LaporanContainer;
