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
        Schema::table('woojs', function (Blueprint $table) {
            $table->dropColumn(['position', 'is_pinned', 'topic_id']);

            $table->longText('content')->change();
            $table->softDeletes('deleted_at')->after('updated_at');
            $table->unsignedBigInteger('author_id')->nullable()->alter('content');

            $table->index('author_id');
            $table
                ->foreign('author_id')
                ->references('id')
                ->on('users')
                ->constrained()
                ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('woojs', function (Blueprint $table) {
            $table->dropColumn(['author_id', 'deleted_at']);

            $table->text('content')->change();
            $table->integer('position')->default(0)->after('content');
            $table->boolean('is_pinned')->default(false)->after('position');
            $table->foreignId('topic_id')->nullable()->nullOnDelete()->after('is_pinned');
        });
    }
};
