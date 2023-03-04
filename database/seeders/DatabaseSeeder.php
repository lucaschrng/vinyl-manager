<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Record;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         User::factory()->create([
             'name' => 'Lucas',
             'email' => 'charoing.lucas@gmail.com',
             'password' => Hash::make('password'),
         ]);

        $cover_urls = [
            'https://i.scdn.co/image/ab67616d0000b273d52bfb90ee8dfeda8378b99b',
            'https://i.scdn.co/image/ab67616d0000b273879e9318cb9f4e05ee552ac9',
            'https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5',
            'https://i.scdn.co/image/ab67616d0000b2730c64e752dec4c08362cc4a88',
            'https://i.scdn.co/image/ab67616d0000b2735cce078fbf09bbe8211caf12',
            'https://i.scdn.co/image/ab67616d0000b2732615b70abbc2c8cc82480e96',
            'https://i.scdn.co/image/ab67616d0000b273b37678d22d4b0b157354412c',
            'https://i.scdn.co/image/ab67616d0000b273c3af0c2355c24ed7023cd394',
            'https://i.scdn.co/image/ab67616d0000b273adf8657e1af5397243934673',
            'https://i.scdn.co/image/ab67616d0000b2730c471c36970b9406233842a5',
        ];

        for ($i = 0; $i < 10; $i++) {
            Record::factory()->create([
                'user_id' => 1,
                'cover_url' => array_shift($cover_urls),
            ]);
        }
    }
}
