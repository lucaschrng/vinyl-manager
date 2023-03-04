<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Record>
 */
class RecordFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
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

        return [
            'user_id' => User::all()->random()->id,
            'artist' => $this->faker->name,
            'title' => rtrim($this->faker->sentence(3, false), '.'),
            'year' => $this->faker->year,
            'description' => $this->faker->paragraph,
            'cover_url' => $this->faker->randomElement($cover_urls),
            'tracks' => json_encode(['Track 1', 'Track 2', 'Track 3', 'Track 4', 'Track 5', 'Track 6', 'Track 7', 'Track 8', 'Track 9', 'Track 10']),
            'number_of_lps' => $this->faker->numberBetween(1, 2),
            'color' => json_encode(['color' => 'black']),
        ];
    }
}
