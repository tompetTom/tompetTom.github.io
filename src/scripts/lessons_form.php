<?php

    $summary_sentence = "";
    $student = "";
    $first_person_pronoun = "";
    $second_person_pronoun = "";
    $instruments = "";
    $experience = "";
    $frequency = "";
    $availability = "";
    $comments = "";
    $name = "";
    $email = "";
    $validation_error = "";

?>

<html>
    <body>
    <form method="post" id="lessons-contact">
            <button>Back</button>
            <button>Start over</button>
            <?=$summary_sentence;?>
            <div class="tab">
                <h2>Who are the lessons for?</h2>
                <div>
                    <input type="radio" name="Student" id="myself" value="myself">
                    <label for="myself">Myself</label>
                </div>
                <div>
                    <input type="radio" name="Student" id="child" value="child">
                    <label for="child">My child</label>
                </div>
                <div>
                    <input type="radio" name="Student" id="friend" value="friend">
                    <label for="friend">A friend or family member</label>
                </div>
                <div>
                    <input type="radio" name="Student" id="other" value="other">
                    <label for="other">Other</label>
                </div>
                <input type="checkbox" name="Bypass" id="bypass">
                <label for="Bypass">No one, I just have a few questions</label><br>
            </div>
            <div class="tab">
                <p>Lessons for <span>myself</span></p>
                <hr>
                <?="<h2>What instrument do {$second_person_pronoun} want to learn?</h2>";?>
                <div>
                    <input type="checkbox" name="Instrument" id="flutes">
                    <label for="Instrument">Flute</label>
                </div>
                <div>
                    <input type="checkbox" name="Instrument" id="clarinet">
                    <label for="Instrument">Clarinet</label>
                </div>
                <div>
                    <input type="checkbox" name="Instrument" id="recorder">
                    <label for="Instrument">Recorder</label>
                </div>
                <div>
                    <input type="checkbox" name="Instrument" id="saxophone">
                    <label for="Instrument">Saxophone</label>
                </div>
                <button class="next">Next</button>
            </div>
            <div class="tab">
                <p><span>Flute</span> lessons for <span>myself</span></p>
                <hr>
                <h2>How long have <span>you</span> been playing?</h2>
                <div>
                    <input type="radio" name="Experience" id="none" value="none">
                    <label for="none"><span>I</span>'ve never played before</label>
                </div>
                <div>
                    <input type="radio" name="Experience" id="beginner" value="beginner">
                    <label for="beginner"><span>I</span> started within the last couple of years</label>
                </div>
                <div>
                    <input type="radio" name="Experience" id="intermediate" value="intermediate">
                    <label for="intermediate"><span>I</span>’ve been learning for a while</label>
                </div>
                <div>
                    <input type="radio" name="Experience" id="professional" value="professional">
                    <label for="professional"><span>I</span> play professionally</label>
                </div>
                <div>
                    <input type="radio" name="Experience" id="returner" value="returner">
                    <label for="returner"><span>I</span> used to play, but took a break</label>
                </div>
            </div>
            <div class="tab">
                <p><span>Flute</span> lessons for <span>myself</span>. <span>I</span>'ve never played before.</p>
                <hr>
                <h2><span>I</span> would want lessons...</h2>
                <div>
                    <input type="radio" name="Frequency" id="weekly" value="weekly">
                    <label for="weekly">Every week</label>
                </div>
                <div>
                    <input type="radio" name="Frequency" id="regularly" value="regularly">
                    <label for="regularly">Every few weeks</label>
                </div>
                <div>
                    <input type="radio" name="Frequency" id="infrequently" value="infrequently">
                    <label for="infrequently">Every now and then</label>
                </div>
                <div>
                    <input type="radio" name="Frequency" id="once" value="once">
                    <label for="once">Just a one-off</label>
                </div>
            </div>
            <div class="tab">
                <p><span>Flute</span> lessons for <span>myself</span>, <span>every week</span>. <span>I</span>'ve never played before.</p>
                <hr>
                <h2>Let's organise <span>a free trial</span> lesson! When works for <span>you</span>?</h2>
                <div>
                    <input type="radio" name="Trial" id="daytimes" value="daytimes">
                    <label for="daytimes">Daytimes</label>
                </div>
                <div>
                    <input type="radio" name="Frequency" id="evenings" value="evenings">
                    <label for="evenings">Evenings</label>
                </div>
                <div>
                    <input type="radio" name="Frequency" id="none" value="none">
                    <label for="none">I don’t want to organise a <span>free </span>lesson just yet</label>
                </div>
            </div>
            <div class="tab">
                <p><span>Flute</span> lessons for <span>myself</span>, <span>every week</span>. <span>I</span>'ve never played before.<span> Daytimes generally work.</span></p>
                <hr>
                <label for="Message">Anything else to add?</label><br>
                <textarea name="Message" id="message" value="<?=$comments;?>"></textarea><br>
                <label for="Name">Name</label><br>
                <input type="text" name="Name" id="name" required><br>
                <label for="Email">Email address</label><br>
                <input type="email" name="Email" id="email" required><br>
                <button type="submit">Finish</button>
            </div>
        </form>
    </body>
</html>