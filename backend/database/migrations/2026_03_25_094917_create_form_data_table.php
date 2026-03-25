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
        Schema::create('form_data', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('page'); // e.g., 'dashboard/events/create', 'settings/profile'
            $table->string('form_key'); // unique identifier for the form on the page
            $table->json('form_data'); // JSON data of all form inputs
            $table->boolean('is_completed')->default(false); // whether the form was submitted
            $table->timestamp('last_updated');
            $table->timestamps();

            $table->index(['user_id', 'page', 'form_key']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_data');
    }
};
