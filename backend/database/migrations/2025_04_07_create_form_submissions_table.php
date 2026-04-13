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
        Schema::create('form_submissions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('form_type'); // e.g., 'login', 'register', 'event_create', 'profile_update', etc.
            $table->string('form_name'); // e.g., 'Create Event', 'Update Profile'
            $table->json('submitted_data'); // The actual form data
            $table->string('status')->default('completed'); // completed, error, etc.
            $table->text('error_message')->nullable(); // If there was an error
            $table->string('ip_address')->nullable();
            $table->string('user_agent')->nullable();
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            // Indexes for faster queries
            $table->index('user_id');
            $table->index('form_type');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_submissions');
    }
};
