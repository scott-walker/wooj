<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Topic;

class TopicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Topic::factory()->create([
            'name' => 'Саморазвитие',
        ]);
        Topic::factory()->create([
            'name' => 'Заметки',
        ]);
        Topic::factory()->create([
            'name' => 'Доступы',
        ]);
    }
}
