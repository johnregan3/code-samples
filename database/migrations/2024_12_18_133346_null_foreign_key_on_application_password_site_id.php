<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up()
    {
        Schema::table('application_passwords', function (Blueprint $table) {
            // Drop the existing foreign key
            $table->dropForeign(['site_id']);

            // Make the `site_id` column nullable
            $table->unsignedBigInteger('site_id')->nullable()->change();

            // Re-add the foreign key with SET NULL on delete
            $table->foreign('site_id')
                ->references('id')
                ->on('sites')
                ->nullOnDelete();
        });
    }

    public function down()
    {
        Schema::table('application_passwords', function (Blueprint $table) {
            // Drop the existing foreign key
            $table->dropForeign(['site_id']);

            // Make the `site_id` column non-nullable
            $table->unsignedBigInteger('site_id')->nullable(false)->change();

            // Re-add the foreign key with CASCADE on delete
            $table->foreign('site_id')
                ->references('id')
                ->on('sites')
                ->cascadeOnDelete();
        });
    }
};
