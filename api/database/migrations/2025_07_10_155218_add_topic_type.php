<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Topic;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('topics', function (Blueprint $table) {
            $types = [
                Topic::TYPE_ALL,
                Topic::TYPE_PINNED,
                Topic::TYPE_PUBLIC,
                Topic::TYPE_CUSTOM,
            ];
            $table->enum('type', $types)->default(Topic::TYPE_CUSTOM);
            $table->index('type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('topics', function (Blueprint $table) {
            $table->dropColumn('type');
        });
    }
};
