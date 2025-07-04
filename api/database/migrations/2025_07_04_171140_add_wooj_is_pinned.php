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
        Schema::dropIfExists('likes');
        Schema::table('woojs', function (Blueprint $table) {
            $table
                ->boolean('is_pinned')
                ->default(false)
                ->after('content');

            $table->index('is_pinned');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('woojs', function (Blueprint $table) {
            $table->dropColumn('is_pinned');
        });
        Schema::create('likes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('wooj_id');
            $table->unsignedBigInteger('user_id');
            $table->timestamps();

            $table->index('wooj_id');
            $table->index('user_id');
            $table->unique(['wooj_id', 'user_id']);

            $table
                ->foreign('wooj_id')
                ->references('id')
                ->on('woojs')
                ->constrained()
                ->cascadeOnDelete();
            $table
                ->foreign('user_id')
                ->references('id')
                ->on('users')
                ->constrained()
                ->cascadeOnDelete();
        });
    }
};
