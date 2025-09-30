<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use App\Models\Topic;
use App\Models\Wooj;
use App\Models\WoojTopic;

class TopicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Topic::truncate();

        Topic::factory()->create([
            'id' => Topic::ID_TOPIC_ALL,
            'name' => 'Все',
        ]);
        Topic::factory()->create([
            'id' => Topic::ID_TOPIC_PINNED,
            'name' => 'Закрепленные',
        ]);
        Topic::factory()->create([
            'id' => Topic::ID_TOPIC_PUBLIC,
            'name' => 'Опубликованные',
        ]);


        DB::statement("select setval('topics_id_seq'::regclass, 3);");

        Topic::factory()->create([
            'name' => 'Саморазвитие',
        ]);
        Topic::factory()->create([
            'name' => 'Заметки',
        ]);
        Topic::factory()->create([
            'name' => 'Доступы',
        ]);

        $woojIds = Wooj::all()->pluck('id')->toArray();
        $woojTopicRelations = [];

        foreach ($woojIds as $woojId) {
            $woojTopicRelations[] = [
                'wooj_id' => $woojId,
                'topic_id' => Topic::ID_TOPIC_ALL
            ];
        }

        WoojTopic::insert($woojTopicRelations);
    }
}
