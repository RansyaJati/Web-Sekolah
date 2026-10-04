<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Attach jurusan photos (public/images/jurusan) to programs by code.
 * Idempotent: safe to re-run.
 */
class UpdateProgramImagesSeeder extends Seeder
{
    public function run(): void
    {
        $map = [
            'RPL' => '/images/jurusan/rpl.jpg',
            'TOI' => '/images/jurusan/toi.jpg',
            'PSPT' => '/images/jurusan/pspt.jpg',
            'TM' => '/images/jurusan/meka.jpg',
            'TEI' => '/images/jurusan/tei.jpg',
            'TEK' => '/images/jurusan/tek.jpg',
            'IOP' => '/images/jurusan/iop.jpg',
            'TPTU' => '/images/jurusan/tptu.jpg',
            'SIJA' => '/images/jurusan/sija.jpg',
        ];

        foreach ($map as $code => $image) {
            DB::table('programs')->where('code', $code)->update([
                'image' => $image,
                'updated_at' => now(),
            ]);
        }
    }
}
