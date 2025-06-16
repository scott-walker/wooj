@props([
    'method' => 'POST',
    'action',
    'categories',
    'errors',
    'data'
])

<form method="POST" action="{{ $action }}">
    @csrf
    @method($method)

    <div class="form">
        <div class="form__item">
            <label class="label" for="title">Title</label>
            <input 
                class="control" 
                id="title" 
                name="title" 
                type="text"
                value="{{ $data['title'] }}"
            />

            @error('title')
                <div class="form__error">{{ $message }}</div>
            @enderror
        </div>
        <div class="form__item">
            <label class="label" for="content">Content</label>
            <textarea 
                class="control" 
                id="content" 
                name="content" 
                rows="5"
            >{{ $data['content'] }}</textarea>

            @error('content')
                <div class="form__error">{{ $message }}</div>
            @enderror
        </div>
        <div class="form__item">
            <label class="label" for="category_id">Category</label>
            <select class="control" id="category_id" name="category_id">
                <option value="" selected disabled>Select category</option>
                @foreach ($categories as $category)
                    <option 
                        value="{{ $category->id }}"
                        {{ $data['category_id'] == $category->id ? 'selected' : '' }}
                    >{{ $category->name }}</option>
                @endforeach
            </select>

            @error('category_id')
                <div class="form__error">{{ $message }}</div>
            @enderror
        </div>
        <div class="form__item">
            <button class="btn" type="submit">Save</button>
        </div>
    </div>
</form>
