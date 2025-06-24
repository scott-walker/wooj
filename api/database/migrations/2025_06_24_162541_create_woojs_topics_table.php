<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('woojs_topics', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('wooj_id');
            $table->unsignedBigInteger('topic_id');

            $table->index('wooj_id');
            $table->index('topic_id');
            $table->unique(['wooj_id', 'topic_id']);

            $table
                ->foreign('wooj_id')
                ->references('id')
                ->on('woojs')
                ->constrained()
                ->cascadeOnDelete();
            $table
                ->foreign('topic_id')
                ->references('id')
                ->on('topics')
                ->constrained()
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('woojs_topics');
    }
};
