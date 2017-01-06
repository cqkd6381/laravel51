@if (count($errors) > 0)
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

@if (session('status'))
    <div class="alert alert-success">
        {{ session('status') }}
    </div>
@endif

@if ($breadcrumb)
    <ol class="breadcrumb">
        <li><a href="#">Home{{$include}}</a></li>
        <li><a href="#">{{$breadcrumb[0]}}</a></li>
        <li class="active">{{$breadcrumb[1]}}</li>
    </ol>
@endif