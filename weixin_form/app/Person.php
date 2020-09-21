<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class person extends Model
{
    protected $table = 'users';

    protected $guarded = ['id'];

    protected  $fillable=['name','demand','phone'];
}
