%% Initial Variable
str = '';
strStart = [];
strEnd = [];
gene = '';
% pattern
ATG = 'ATG';
TAA = 'TAA';
TAG = 'TAG';
TGA = 'TGA';
condition = 0;
%% Input String
while isempty(str) == 1
    prompt = 'Enter a gene string: ';                      % Request user input
    str = input(prompt, 's');  
end

%% Find Gene
% start pattern
strStart = strfind(str, ATG);                                               % strStart is array; find strings within string 'ATG'
lenStart = length(strStart);                                                % lenStart is number; length of largest array dimension
% end pattern
strEnd = strfind(str, TAA);                                                 % strEnd is array; find strings within string 'TAA', 'TAG', 'TGA'
strEnd = [strEnd, strfind(str, TAG)];
strEnd = [strEnd, strfind(str, TGA)];
strEnd = sort(strEnd);                                                      % sorting array elements in ascending order
lenEnd = length(strEnd);                                                    % lenEnd is number; length of largest array dimension

if isempty(strStart) == 1 || isempty(strEnd) == 1                           % if strStart[] or strEnd[] is empty, jump to case 1
    condition = 1;
else
    m = 1;                                                                  % index of array start from 1
    n = 1;
    while m <= lenStart && n <= lenEnd
        if strStart(m) < strEnd(n)
            if m+1 <= lenStart && strStart(m+1) < strEnd(n)                 % position of next start-string before end-string
                m = m + 1;
            end
            gene = [gene, extractBetween(str, strStart(m)+3, strEnd(n)-1)];
            m = m + 1;
            n = n + 1;
        elseif strStart(m) > strEnd(n)                                       % if position of end-string before start-string, then position of end-string goto next
            n = n + 1;                                                     
        end
    end
    if (gene == "")
        condition = 1;
    else
        condition = 2;
    end
end   
%% Result
switch condition
    case 1
        disp('No gene is found');                                           % display string of none gene
    case 2
        disp(gene);                                                         % displa string of gene  
    otherwise
        disp('Error!');                                                     %display error message
end
